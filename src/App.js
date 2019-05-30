import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Security, SecureRoute,ImplicitCallback} from '@okta/okta-react';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import HomepagePatient from './components/HomepagePatient';
import HomepageProvider from './components/HomepageProvider';
import Homepage from './components/Homepage';

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
                  redirect_uri='http://161.85.83.195:3000/Implicit/Callback'
                  onAuthRequired={onAuthRequired} >
              <Route exact path='/' component={Home} />
              <Route path='/Register' component={Register} />
              <SecureRoute path='/Homepage' component={Homepage} />
              <SecureRoute path='/HomepagePatient' component={HomepagePatient} />
              <SecureRoute path='/HomepageProvider' component={HomepageProvider} />
              <Route path='/Login' render={() => <Login baseUrl='https://dev-357341.okta.com' />} />
              <Route path='/implicit/callback' component={ImplicitCallback} />
          </Security>
          </Switch>
        </div>
      </Router>
    );
  }
}
