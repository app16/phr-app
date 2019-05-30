import React, { Component } from 'react';
import './login.css'
import {withRouter} from "react-router-dom";
import HomeNav from './HomeNav';
import Modal from 'react-responsive-modal'
class Login2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            userType : '',
            open:false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    handleInputChange (event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
        
    }

    handleClick(){
        if(this.state.userType==='Patient'){
            this.props.history.push("/HomepagePatient");
        }
        else if (this.state.userType==='Provider'){
            this.props.history.push("/HomepageProvider");
        }else{
            this.onOpenModal();            
        }
    }

    onOpenModal() {
      this.setState({open:true});
    }
  
    onCloseModal() {
      this.setState({open:false});
    }

  render() {
    console.log(this.state)
    return (
        <div >
        <HomeNav/>
        <div className="loginform" >
       
        <br>
        </br>
        <br></br>
        <form>
        <div className="container-fluid">
        <div className="form-group row">
          <label  className="col-sm-2 col-form-label">User Type</label>
          <div className="col-sm-3">
          <select name="userType" value={this.state.userType} onChange={this.handleInputChange} className="form-control">
            <option disabled defaultValue>--select an option -- </option>
            <option></option>
                  <option value= "Patient">Patient</option>
                  <option value= "Provider">Provider</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
            <label  className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-3">
                <input type="text" className="form-control" id="username" placeholder="Username"></input>
            </div>
        </div>
        <div className="form-group row">
            <label  className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-3">
                <input type="password" className="form-control" id="password" placeholder="Password"></input>
            </div>
        </div>
        <div className="form-group">
            <div className="col-sm-5">
              <button type="button" onClick={this.handleClick} className="btn btn-primary btn-block">Log In</button>
            </div>
          </div>
        </div>
        </form>
        <Modal open = {this.state.open} onClose={this.onCloseModal} center>
              <div style={{width: "700px", height:"100px"}}>
                <h1> Please Select Appropriate User Type</h1>              
              </div>
            </Modal>
      </div>
      </div>
    );
  }
}

export default withRouter(Login2);