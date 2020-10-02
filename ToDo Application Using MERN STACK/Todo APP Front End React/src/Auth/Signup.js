import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect, Link } from "react-router-dom";
import {signup} from "./apicall";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      email: "",
      error:"",
      loading: false,
      success: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  
  handleSubmit(event) {
    event.preventDefault();
    
    let   name=this.state.name;
    let email=this.state.email;
    let password=this.state.password;
    signup({name,email,password}).then(data=>{
      if(data.error){
        this.setState({error:data.error,success:false});
      }
      else{
        this.setState({name:'',email:"",password:"",success:true})
      }
    });
  }

  successMessage() {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {this.state.success && (
            <div
              className="alert alert-success"
              style={{ display: this.state.success ? "" : "none" }}
            >
              New account was created successfully. Please
              <Link to="/user/signin">Login Here</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
  errorMessage() {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          {this.state.error && (
            <div
              className="alert alert-warning"
              style={{ display: this.state.error ? "" : "none" }}
            >
             {this.state.error} 
              {/* <Link to="/">Login Here</Link> */}
            </div>
          )}
        </div>
      </div>
    );
  }
  signUpForm() {
    return (
      <div className="row">
        <div className="col-md-3 offset-sm-3 text-left">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="text-dark">Name</label>
              <input
                required
                onChange={this.handleChange("name")}
                value={this.state.name}
                className="form-control"
                type="text"
              />
              <label className="text-dark">Email</label>
              <input
                className="form-control"
                onChange={this.handleChange("email")}
                type="email"
                value={this.state.email}
              />
              <label className="text-dark">Password</label>
              <input
                onChange={this.handleChange("password")}
                value={this.state.password}
                className="form-control"
                type="password"
                required
              />
            </div>
            <button className="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    );
  }
  render() {
    return (
      <Base>
        {this.errorMessage()}
        {this.successMessage()}
        {this.signUpForm()}
        {/* {this.performRedirect()} */}
      </Base>
    );
  }
}

export default Signup;
