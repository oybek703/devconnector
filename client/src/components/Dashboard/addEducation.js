import React, {Fragment, useState} from 'react';
import {Link, withRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addEducation} from "../../redux/actions/profile";

const AddEducation = ({history}) => {
    const [formData, setFormData] = useState({school: '', degree: '', fieldofstudy: '', from: '', to: '', description: '', current: false});
    const [toDate, showToDate] = useState(false);
    const dispatch = useDispatch();
    const {school, degree, fieldofstudy, from, to, description, current} = formData;
    const handleChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addEducation(formData, history))
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        required
                        value={school} onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        required
                        value={degree} onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            value={current}
                            onChange={() => {
                                setFormData({...formData, current: !current});
                                showToDate(!toDate);
                        }}/> Current School or Bootcamp
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} disabled={toDate} onChange={handleChange}/>
                </div>
                <div className="form-group">
          <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value={description} onChange={handleChange}
          ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    );
};

export default withRouter(AddEducation);