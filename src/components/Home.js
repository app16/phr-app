import React, { Component } from 'react';
import HomeNav from './layouts/HomeNav';
import './login.css'
class Home extends Component {
  
  render() {
    return (
        <div>
            <HomeNav/>
          <div className="appBackground" style = {{height:"92.3vh",width:"210.95vh"}}>
          </div>
        </div>
    );
  }
}

export default Home;