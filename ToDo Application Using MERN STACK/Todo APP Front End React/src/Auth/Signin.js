import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "./apicall";

class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      didRedirect:false,
      error:"",
      loading: false,
      success: false,
      user:null
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
    let email=this.state.email;
    let password=this.state.password;
    signin({email,password}).then(data=>{
      if(data.error){
        this.setState({error:data.error,success:true});
      }
      else{
        // this.setState({name:'',email:"",password:"",success:true});
        authenticate(data, () => {
          this.setState({
            didRedirect: true,
            user:isAutheticated()
          });

        });
      }
    });
  }

   performRedirect ()  {
   
    if (this.state.didRedirect) {
      if (this.state.user) {
        return <Redirect to="/" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };
  errorMessage () {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: this.state.error ? "" : "none" }}
          >
            {this.state.error}
          </div>
        </div>
      </div>
    );
  };
  signInForm() {
    return (
      <div className="row">
        <div className="col-md-3 offset-sm-3 text-left">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
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
        {this.performRedirect()}
        {this.signInForm()}
        {/* {this.performRedirect()} */}
      </Base>
    );
  }
}

export default Signin;
