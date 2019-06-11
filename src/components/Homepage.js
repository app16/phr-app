import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";
import { withAuth } from '@okta/okta-react';

export default withRouter ( withAuth(class Homepage extends Component {
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
    this.props.auth.getUser().then(res =>{
      console.log(res);
      const login = res.preferred_username;
      fetch('https://dev-357341.okta.com/api/v1/users/'+login,{
            method:'get',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Custom-Allowed-Origin-Header-1':'http://130.147.175.222:8092/Homepage',
              Authorization: 'SSWS 00lVxvLE_yLY68atO_Qj6dKFcdvb0QqqPke4G_WYSC'        
            },
            json: true   
          }).then(response => {
            return response.json();    
          }).then(res =>{
            console.log(res.profile);
            
            const usertype = res.profile.UserType;
            console.log(res.profile.UserType);    
            if (usertype === 'Patient' )
              this.props.history.push("/Patient/Dashboard");      
            else if(usertype !== 'Patient') 
              this.props.history.push("/Provider/Dashboard");     
            return usertype; 
          }); 
          
          return res;
    });
    
    
    
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
      
    return (
      <div>
        <Link to='/'>Home</Link><br/>
        <Link to='/protected'>Protected</Link><br/>
        {button}
       
      </div>
    );
  }
}));