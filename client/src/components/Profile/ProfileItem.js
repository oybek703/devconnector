import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

const ProfileItem = ({profile}) => {
    return (
        <Fragment>
            <div className="profile bg-light">
                <img
                    className="round-img"
                    src={profile.user.avatar}
                    alt={`${profile.user.name}'s image`}
                />
                <div>
                    <h2>{profile.user.name}</h2>
                    <p>{profile.status} {profile.company && (<span>at {profile.company}</span>)}</p>
                    <p>{profile.location}</p>
                    <Link to={`/profile/${profile.user._id}`} className="btn btn-primary">View Profile</Link>
                </div>

                <ul>
                    {
                        profile.skills.map((skill, index) => (
                            <li className="text-primary" key={`${skill} - ${index}`}>
                                <i className="fas fa-check"></i> {skill}
                            </li>)
                        )
                    }
                </ul>
            </div>
        </Fragment>
    );
};

export default ProfileItem;