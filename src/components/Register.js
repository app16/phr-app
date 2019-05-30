import React, { Component } from 'react';
import './login.css'
import {withRouter} from "react-router-dom";
import HomeNav from './layouts/HomeNav';
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      firstname:'',
      lastname:'',
      usertype:'',
      password:'',
      email:''
    };
    this.createUser = this.createUser.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  
  handleChange = (event) =>{
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]:value
    })
  }
  createUser = () => {
    console.log(this.state);
    fetch('https://dev-357341.okta.com/api/v1/users',{
      method:'post',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Custom-Allowed-Origin-Header-1':'http://161.85.83.195:3000/Register',
        Authorization: 'SSWS 00lVxvLE_yLY68atO_Qj6dKFcdvb0QqqPke4G_WYSC'        
      },
      body: JSON.stringify({
        profile:{
          firstName:this.state.firstname,
          lastName:this.state.lastname,
          email:this.state.email,
          login:this.state.email,
          UserType:this.state.usertype
        },
        credentials:{
          password:{value:this.state.pass}
        }
      }),
      json: true   
    }).then(response => {
      return response.json();    
    }).then(res =>{
      console.log(res);      
    });   
    
  }

  render() {
    return (
      <div>
        <HomeNav/>
      <div className="loginform" >
      <br>
      </br>
      <br></br>
      <form>
      <div className="container-fluid">
      <div className="form-group row">
          <label className="col-sm-2 col-form-label">First Name</label>
          <div className="col-sm-3">
              <input type="text" className="form-control" name="firstname" placeholder="First Name" onChange={this.handleChange}></input>
          </div>
      </div> 
      <div className="form-group row">
          <label className="col-sm-2 col-form-label">Last Name</label>
          <div className="col-sm-3">
              <input type="text" className="form-control" name="lastname" placeholder="Last Name" onChange={this.handleChange}></input>
          </div>
      </div>
      <div className="form-group row">
          <label className="col-sm-2 col-form-label">User Type</label>
          <div className="col-sm-3">
          <select name="usertype" className="form-control" onChange={this.handleChange}>
            <option disabled defaultValue>--select an option -- </option>
            <option></option>
                  <option value= "Patient">Patient</option>
                  <option value= "Physician">Physician</option>
                  <option value= "Insurance">Insurance Provider</option>
                  <option value= "Pharmacist">Pharmacist</option>
                  <option value= "Nutritionist">Nutritionist</option>
            </select>
          </div>
      </div>
      <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email ID</label>
          <div className="col-sm-3">
              <input type="email" className="form-control" name="email" placeholder="Email ID" onChange={this.handleChange}></input>
          </div>
      </div>
      <div className="form-group row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-3">
              <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange}></input>
          </div>
      </div>
      <div className="form-group">
            <div className="col-sm-5">
              <button type="button" onClick={this.createUser} className="btn btn-primary btn-block" >Register</button>
            </div>
          </div>
      </div>
      </form>
    </div>
    </div>
    );
  }
}
export default withRouter(Register);