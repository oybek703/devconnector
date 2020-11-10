import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import {Provider} from "react-redux";
import store from "./redux/store";
import Alert from "./components/Alert";
import {loadUser} from "./redux/actions/auth";
import {setAuthToken} from "./utils";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";

if(localStorage.token) setAuthToken(localStorage.token);

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return(
        <Fragment>
            <Provider store={store}>
                <Router>
                    <Navbar/>
                    <Route exact path='/' component={Landing}/>
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route path='/register' exact component={Register} />
                            <Route path='/login' exact component={Login} />
                            <PrivateRoute path='/dashboard' exact component={Dashboard} />
                            <PrivateRoute path='/create-profile' exact component={CreateProfile} />
                            <PrivateRoute path='/edit-profile' exact component={EditProfile} />
                        </Switch>
                    </section>
                </Router>
            </Provider>
        </Fragment>
)
};

export default App;
