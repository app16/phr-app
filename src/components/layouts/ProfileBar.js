import React from "react";
import {Link} from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class ProfileBar extends React.Component {
  constructor() {
    super()
    this.state = {
      name:null,
      id:null
    };
    this.logout = this.logout.bind(this);
  }
  async logout() {
    this.props.auth.logout('/Login');
  }

  async componentDidMount() {
    this.props.auth.getUser().then(res =>{
      console.log(res);
      const login = res.preferred_username;
      this.setState({name:res.name,id:login})
    })
  }
  
  render() {
    
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">         
            <ul className="navbar-nav mr-auto">
              <li className="nav-link"><b>{this.state.name}</b>
              </li>
              <li className="nav-link"><b>{this.state.id}</b>
              </li>
              <li className="nav-link"><b>Male</b>
              </li>
              <li className="nav-link"><b>25</b>
              </li>
              <li><Link onClick={this.logout} className="nav-link" to={"/Login"}><b>Logout</b>
              </Link></li>
            </ul>
        </nav>
      </div>
    );
  }
});
