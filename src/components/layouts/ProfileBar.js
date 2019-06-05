import React from "react";
import {Link} from 'react-router-dom';
export default class ProfileBar extends React.Component {
  constructor() {
    super()
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">         
            <ul className="navbar-nav mr-auto">
              <li className="nav-link">
               <b>John Appleseed</b>
              </li>
              <li  className="nav-link">
                <b>PA3</b>
              </li>
              <li  className="nav-link">
                <b>Male</b>
              </li>
              <li  className="nav-link">
               <b>25</b>
              </li>
              <li  className="nav-link">
                <b>Logout</b>
              </li>
            </ul>
        </nav>
      </div>
    );
  }
}
