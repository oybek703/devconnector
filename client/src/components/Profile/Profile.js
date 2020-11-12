import React, {Fragment, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getUserById} from "../../redux/actions/profile";
import Spinner from "../Layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
const Profile = ({match}) => {
    const {profile, loading: profileLoading} = useSelector(state => state.profile);
    const {user,loading: authLoading, isAuthenticated} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserById(match.params.id));
    }, []);
    return (
        <Fragment>
            {
                    (profileLoading || authLoading || !profile)
                    ? <Spinner/>
                    : (
                        <Fragment>
                            <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
                            {isAuthenticated && profile.user._id === user._id && <Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>}
                            <div className="profile-grid my-1">
                                <ProfileTop profile={profile}/>
                                <ProfileAbout profile={profile}/>
                                <ProfileExperience experiences={profile.experience}/>
                                <ProfileEducation educations={profile.education}/>
                                <ProfileGithub username={profile.githubusername}/>
                            </div>
                        </Fragment>
                    )
            }
        </Fragment>
    );
};

export default withRouter(Profile);