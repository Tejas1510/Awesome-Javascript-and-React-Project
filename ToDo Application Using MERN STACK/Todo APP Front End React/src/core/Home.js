import React from "react";
import Base from "./Base";
import SideNav from "./SideNavBar";
import Signin from "../Auth/Signin";
import { Redirect, Link } from "react-router-dom";
import { isAutheticated } from "../Auth/apicall";
import LoadUserData from "./LoadUserData";


const Home = () => {
  return (
    <Base>
      {!isAutheticated() && (
        <div className="jumbotron">
          <h1 className="display-6">Hello, world!</h1>
          <p className="lead">
            TodoArray is the responsive,dynamic and awesome task management web-app.
          </p>
          <hr className="my-4" />
          
          <Link className="btn btn-dark btn-lg" to="/user/signin" role="button">
            signin
          </Link>
          <Link className="btn btn-dark btn-lg ml-2" to="/user/signup" role="button">
            register
          </Link>
          
        </div>
        
      )}
      {isAutheticated() && <LoadUserData/>}
    </Base>
   
  );
};

export default Home;
