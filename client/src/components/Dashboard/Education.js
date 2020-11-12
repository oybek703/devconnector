import React, {Fragment} from 'react';
import Moment from "react-moment";
import {deleteEducation} from "../../redux/actions/profile";
import {useDispatch} from "react-redux";

const Education = ({educations}) => {
    const dispatch = useDispatch();
    return (
        <Fragment>
            <h1 className='my-1'>Education Credentials</h1>
            {
                !educations.length ? (<p>No education, please add any education information.</p>) :
                    <table className='table'>
                        <thead>
                        <tr>
                            <th className='hide-sm'>School</th>
                            <th className='hide-sm'>Degree</th>
                            <th className='hide-sm'>Years</th>
                            <th className='hide-sm'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            educations.map(edu => (
                                <tr key={edu._id}>
                                    <td>{edu.school}</td>
                                    <td>{edu.degree}</td>
                                    <td>
                                        <Moment format='YYYY/MM/DD'>{edu.from}</Moment>
                                        {edu.to ? (<Fragment> - <Moment format='YYYY/MM/DD'>{edu.to}</Moment></Fragment>) : ' - Now'}
                                    </td>
                                    <td><button onClick={() => dispatch(deleteEducation(edu._id))} className='btn btn-danger'>Delete</button></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
            }
        </Fragment>
    );
};

export default Education;