import React from "react";
import Menu from "./menu";
import { isAutheticated } from "../Auth/apicall";

const Base = ({
  className = "bg-light text-dark my-3 p-4",
  children
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className={className}>{children}</div>
    </div>
    {
     !isAutheticated()&&(
    
        <footer style={{position: "fixed",left:0,bottom:"0",width:"100%"}} className="footer bg-dark mt-auto py-3">
      <div style={{background:"#28edff"}} className="container-fluid text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-white py-3">
          Created By Team Achievers
        </span>
      </div>
    </footer>
      )
    }
  </div>
);

export default Base;