import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Register from "./components/Register";
import Login from "./components/Login";
import {Provider} from "react-redux";
import store from "./redux/store";
import Alert from "./components/Alert";
const App = () => (
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
                    </Switch>
                </section>
            </Router>
        </Provider>
    </Fragment>
);

export default App;
