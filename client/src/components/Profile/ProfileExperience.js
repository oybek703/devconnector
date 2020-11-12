import React, {Fragment} from 'react';
import Moment from "react-moment";

const ProfileExperience = ({experiences}) => {
    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
                {
                    !experiences.length ? (<p>No experience credentials.</p>) : (<Fragment>
                        {
                            experiences.map(experience => (
                                <Fragment key={`${experience.from}`}>
                                    <h3 className="text-dark">{experience.company}</h3>
                                    <Moment format='YYYY/MM/DD'>{experience.from}</Moment>{' '}
                                    - {experience.to ? <Moment format='YYYY/MM/DD'>{experience.to}</Moment> : 'Now'}
                                    <p><strong>Position: </strong>{experience.title}</p>
                                    <p>
                                        <strong>Description: </strong>{experience.description}
                                    </p>
                                </Fragment>
                            ))
                        }
                    </Fragment>)
                }
        </div>
    );
};

export default ProfileExperience;