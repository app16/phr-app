import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Homepage extends Component {
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

        fetch('https://dev-357341.okta.com/api/v1/users/me',{
            method:'get',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':'*',
              'Custom-Allowed-Origin-Header-1':'http://161.85.83.195:3000/Homepage',
              Authorization: 'SSWS 00lVxvLE_yLY68atO_Qj6dKFcdvb0QqqPke4G_WYSC'        
            },
            json: true   
          }).then(response => {
            return response.json();    
          }).then(res =>{
            console.log(res);      
          });        

  }

  async componentDidUpdate() {
    this.checkAuthentication();
    const user = this.props.auth.getCurrentUser();
    console.log(user);
    
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
});