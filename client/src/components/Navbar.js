import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/actions/auth";

const Navbar = () => {
    const {isAuthenticated, loading} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const authLinks = (
        <ul>
            <li><Link to="/dashboard">
                <span>
                    <i className='fas fa-user'></i> {' '}
                    Dashboard
                </span>
            </Link></li>
            <li><a href="#!" onClick={() => dispatch(logout())}>
                <span className='hide-sm'>
                <i className='fas fa-sign-out-alt'></i> {' '}
                    Logout
                </span></a>
            </li>
        </ul>
    ) ;
    const guestLinks = (
        <ul>
            <li><a href="#!">Developers</a></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>

    );
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/" ><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </nav>
    );
};

export default Navbar;