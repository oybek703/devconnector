import React, {Fragment, useEffect} from 'react';
import {getCurrentProfile} from "../redux/actions/profile";
import Spinner from "./Spinner";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard = () => {
    const {profile: {profile, loading}, auth: {user}} = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCurrentProfile());
    }, []);
    return (
        <Fragment>
            {loading ? <Spinner/> : (
                <Fragment>
                    <h1 className='text-primary large'>Dashboard</h1>
                    <p className='lead'><i className='fas fa-user'></i> {' '}Welcome {user && user.name}</p>
                    <DashboardActions/>
                    {
                        !profile
                        ? (<Fragment>
                                <p>You have not profile yet, please add some info.</p>
                                <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                            </Fragment>)
                        : (<Fragment>

                            </Fragment>)
                    }
                </Fragment>
            )}
        </Fragment>
    );
};



export default Dashboard;