import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import {Provider} from "react-redux";
import {loadUser} from "./redux/actions/auth";
import store from "./redux/store";
import {setAuthToken} from "./utils";
import Routes from "./components/Routing/Routes";

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
                    <Switch>
                        <Route exact path='/' component={Landing}/>
                        <Route component={Routes}/>
                    </Switch>
                </Router>
            </Provider>
        </Fragment>
)
};

export default App;
