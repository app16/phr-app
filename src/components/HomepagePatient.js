import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { withAuth } from '@okta/okta-react';
import Nav from "./layouts/Nav";
import ProfileBar from "./layouts/ProfileBar";

export default withRouter ( withAuth(class HomepagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
    
  }

  async componentDidUpdate() {
    this.checkAuthentication();    
  }

  async login() {
    this.props.auth.login('/');
  }

  async logout() {
    this.props.auth.logout('/');
  }
 
  render() {
    if (this.state.authenticated === null) return null;

    const button = this.state.authenticated ?
      <button onClick={this.logout}>Logout</button> :
      <button onClick={this.login}>Login</button>;

    const containerStyle = {
      marginTop: "60px"
    };
      
    return (
      <div>
           <div>
      <ProfileBar />
        <Nav />
        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">

            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}));