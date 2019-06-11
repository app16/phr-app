import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Security, SecureRoute,ImplicitCallback} from '@okta/okta-react';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import HomepageProvider from './components/HomepageProvider';
import Homepage from './components/Homepage';
import PatientDashboard from './components/PatientDashboard';
import PatientPermissions from './components/PatientPermissions';
import ProviderDashboard from './components/ProviderDashboard';
import ProviderPermissions from './components/ProviderPermissions.js';



function onAuthRequired({history}){
  history.push('/Login');
}

export default class App extends Component {
  componentDidMount(){
    document.title = "PHR: Home"
  }
  render() {
    return (
    <Router>
        <div>          
          <Switch>
            <Security issuer='https://dev-357341.okta.com/oauth2/default'
                  client_id='0oan7amkzGxnqxahO356'
                  redirect_uri='http://130.147.175.222:8092/Implicit/Callback'
                  onAuthRequired={onAuthRequired} >
              <Route exact path='/' component={Home} />
              <Route path='/Register' component={Register} />
              <SecureRoute path='/Homepage' component={Homepage} />
              <SecureRoute path='/HomepageProvider' component={HomepageProvider} />
              <SecureRoute path='/Patient/Dashboard' component={PatientDashboard} />
              <SecureRoute path='/Patient/Permissions' component={PatientPermissions} />
              <SecureRoute path='/Provider/Dashboard' component={ProviderDashboard} />
              <SecureRoute path='/Provider/Permissions' component={ProviderPermissions} />
              <Route path='/Login' render={() => <Login baseUrl='https://dev-357341.okta.com' />} />
              <Route path='/implicit/Callback' component={ImplicitCallback} />
          </Security>
          </Switch>
        </div>
      </Router>
    );
  }
}
