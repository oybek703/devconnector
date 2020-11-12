import React, {Fragment, useState} from 'react';
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../../redux/actions/alert";
import {register} from "../../redux/actions/auth";

const Register = () => {
    const [formData,setFormData] = useState({name: '', email: '', password: '', password2: ''});
    const {isAuthenticated} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {name, email, password, password2} = formData;
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== password2) {
            dispatch(setAlert('Password do not match.', 'danger'));
        } else {
            dispatch(register(name, email, password));
        }
    }
    if(isAuthenticated) {
        return <Redirect to='/dashboard'/>
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={handleChange} required/>
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password} onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={password2} onChange={handleChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

export default Register;