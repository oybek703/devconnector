import React from 'react';
import Alert from "../Layout/Alert";
import {Switch, Route} from "react-router-dom";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Profiles from "../Profile/Profiles";
import Profile from "../Profile/Profile";
import Dashboard from "../Dashboard/Dashboard";
import CreateProfile from "../Dashboard/CreateProfile";
import EditProfile from "../Dashboard/EditProfile";
import PrivateRoute from "./PrivateRoute";
import AddExperience from "../Dashboard/AddExperience";
import AddEducation from "../Dashboard/addEducation";
import Post from "../Post/Post";
import Posts from "../Post/Posts";
import NotFound from "../Layout/NotFound";

const Routes = () => {
    return (
        <section className='container'>
            <Alert />
            <Switch>
                <Route path='/register' exact component={Register} />
                <Route path='/login' exact component={Login} />
                <Route path='/profiles' exact component={Profiles} />
                <Route path='/profile/:id' exact component={Profile} />
                <PrivateRoute path='/dashboard' exact component={Dashboard} />
                <PrivateRoute path='/create-profile' exact component={CreateProfile} />
                <PrivateRoute path='/edit-profile' exact component={EditProfile} />
                <PrivateRoute path='/add-experience' exact component={AddExperience} />
                <PrivateRoute path='/add-education' exact component={AddEducation} />
                <PrivateRoute path='/posts/:id' exact component={Post} />
                <PrivateRoute path='/posts' exact component={Posts} />
                <Route component={NotFound}/>
            </Switch>
        </section>
    );
};

export default Routes;