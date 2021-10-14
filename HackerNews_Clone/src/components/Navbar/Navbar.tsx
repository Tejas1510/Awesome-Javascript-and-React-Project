
import "./Navbar.css"
import {
  NavLink,
  withRouter
} from "react-router-dom";

import Actionbutton from "../ActionButton/Actionbutton"
import React from "react";

type history={
    location:{
      pathname:string
  }
}

const currentTab:Function = (history:history, path:string):boolean => {
  if (history.location.pathname === path) {
    return true;
  } else {
    return false;
  }
};


const Navbar:React.FC<history> = (props):React.ReactElement => {
  return (
    <>
    <nav className="navbar">
      <h2 className="brand">
        <span className="brand_span">Hacker</span>News
      </h2>
    </nav>

    <div className="container">
     <div className="action_button">
      <NavLink to="/new" >
        <Actionbutton isActive={currentTab(props,"/new")} text="New" />
      </NavLink>
      
      <NavLink to="/top" >
        <Actionbutton isActive={currentTab(props,"/top")} text="Past" />
        </NavLink>

      <NavLink to="/best" >
        <Actionbutton isActive={currentTab(props,"/best")} text="Best" />
        </NavLink>
    </div>
    </div>
    </>
  )
}

export default withRouter(Navbar)
