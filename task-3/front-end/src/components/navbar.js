import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Route, Redirect, Link, useLocation } from "react-router-dom";
import { Login, Logout } from './login';
import { Home } from './home';
import { NewDog } from './new-dog';
import { Signup } from './signup';
import { Dog } from './dog';
import { PrivateRoute } from './private-route';
import '../css/navbar.css';

export const NavigationBar = () => {
    const auth = useAuth();
    const location = useLocation();

    const [isMobileNavbar, setIsMobileNavbar] = useState("");
    const movileNavbar = () => {
        if (!isMobileNavbar[0]) {
            setIsMobileNavbar(" is-active");
        } else {
            setIsMobileNavbar("");
        }
    };

    return (
        <div className="column is-desktop has-background-white">
            <nav className="navbar is-mobile is-desktop has-background-grey-darker" role="navigation" aria-label="main navigation">
                <div className="navbar-brand has-background-grey-darker has-text-light">
                    <a onClick={movileNavbar} href="#mobilebar" role="button" className={`navbar-burger${isMobileNavbar} has-background-grey-darker has-text-light`} aria-label="menu" aria-expanded="false" data-target="navbar">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbar" className={`navbar-menu${isMobileNavbar}`}>
                    <div className="navbar-start">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a href="#navigationbar" id="navigationbar" className="navbar-link has-background-grey-darker has-text-light" >
                                Dog Realm
                            </a>
                            <div className="navbar-dropdown has-background-grey-darker">
                                {
                                    auth.user ? (
                                        <div>
                                            <Link to="/home" className="navbar-item has-background-grey-darker has-text-light">Home</Link>
                                            <Link to="/add-dog" className="navbar-item has-background-grey-darker has-text-light">Add Dog</Link>
                                            <Link to="/logout" className="navbar-item has-background-grey-darker has-text-light">Logout</Link>
                                        </div>
                                    ) : (
                                        <div>
                                            <Link to="/" className="navbar-item has-background-grey-darker has-text-light">Login</Link>
                                            <Link to="/signup" className="navbar-item has-background-grey-darker has-text-light">Sign Up</Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </nav>

            <Route exact path="/">
                {auth.user ? <Redirect to="/home?page=1" /> : <Login />}
            </Route>

            <Route path="/signup">
                {auth.user ? <Redirect to="/home?page=1" /> : <Signup />}
            </Route>

            <PrivateRoute path="/home">
                <Home />
            </PrivateRoute>

            <PrivateRoute path="/dog/:id">
                <Dog />
            </PrivateRoute>

            <PrivateRoute path="/add-dog">
                <NewDog />
            </PrivateRoute>

            <PrivateRoute path="/logout">
                <Logout />
            </PrivateRoute>

        </div>
    );
};
