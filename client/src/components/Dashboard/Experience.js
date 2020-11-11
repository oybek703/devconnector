import React, {Fragment} from 'react';
import Moment from 'react-moment';
import {useDispatch} from "react-redux";
import {deleteExperience} from "../../redux/actions/profile";
const Experience = ({experiences}) => {
    const dispatch = useDispatch();
    return (
        <Fragment>
            <h1 className='my-1'>Experience Credentials</h1>
            <table className='table'>
                <thead>
                <tr>
                    <th className='hide-sm'>Company</th>
                    <th className='hide-sm'>Title</th>
                    <th className='hide-sm'>Years</th>
                    <th className='hide-sm'></th>
                </tr>
                </thead>
                <tbody>
                    {
                        experiences.map(exp => (
                            <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td>{exp.title}</td>
                                <td>
                                    <Moment format='YYYY/MM/DD'>{exp.from}</Moment>
                                    {exp.to ? (<Fragment> - <Moment format='YYYY/MM/DD'>{exp.to}</Moment></Fragment>) : ' - Now'}
                                </td>
                                <td><button onClick={() => dispatch(deleteExperience(exp._id))} className='btn btn-danger'>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default Experience;