import React from "react";
import {Link} from 'react-router-dom';
import logo from './logo.png';
export default class HomeNav extends React.Component {
    render() {
        
        return (
            <div>            
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary" >
                <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link"> <b>PHR</b> </Link></li>
                </ul>
                <ul  className="navbar-nav ml-auto">
                    <li><Link to={'/Login'} className="nav-link">Login</Link></li>
                    <li><Link to={'/Register'} className="nav-link">Register</Link></li>
                </ul>
                <img className="navbar-brand"src={logo} width="80" height="28" alt="logo" />
                </nav>
            </div>
        );
    }
}
          