import React, {Fragment} from 'react';
import Moment from "react-moment";

const ProfileEducation = ({educations}) => {
    return (
        <Fragment>
            <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {
                    !educations.length ? (<p>No education credentials.</p>) :
                        educations.map(education => (<Fragment key={`${education.from}`}>
                            <h3>{education.school}</h3>
                            <Moment format='YYYY/MM/DD'>{education.from}</Moment> {' '}
                             - {education.to ? <Moment format='YYYY/MM/DD'>{education.to}</Moment> : 'Now'}
                            <p><strong>Degree: </strong>{education.degree}</p>
                            <p><strong>Field Of Study: </strong>{education.fieldofstudy}</p>
                            <p>
                                <strong>Description: </strong>{education.description}
                            </p>
                        </Fragment>))
                }
            </div>
        </Fragment>
    );
};

export default ProfileEducation;