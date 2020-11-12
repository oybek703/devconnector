import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ProfileItem from "./ProfileItem";
import {getAllProfiles} from "../../redux/actions/profile";
import Spinner from "../Layout/Spinner";

const Profiles = () => {
    const {profiles, loading} = useSelector(state => state.profile);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProfiles());
    }, [])
    return (
        <Fragment>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop'></i>
                Browse and connect with developers
            </p>
            {
                loading
                ? <Spinner/>
                 : profiles.map(profile => <ProfileItem key={profile._id} profile={profile}/>)
            }
        </Fragment>
    );
};

export default Profiles;