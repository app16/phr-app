import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import {withRouter} from "react-router-dom";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
    };
  }



  render() {

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light " >  
              <ul className="navbar-nav mr-auto">              
                <li>
                  <Link to={"/Dashboard"} className="nav-link">Dashboard</Link>
                </li>
                <li>
                  <Link to={"/Permissions"} className="nav-link">Permissions</Link>
                </li>
              </ul>
        </nav>
      </div>
    );
  }
}
