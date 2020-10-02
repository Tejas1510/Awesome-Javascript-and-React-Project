import React, { Fragment } from "react";
import { Link, withRouter} from "react-router-dom";
import { isAutheticated ,signout} from "../Auth/apicall";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "black" };
  }
};

const Menu = ({ history }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" href="/">TodoArray</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
        </li>
        
      {!isAutheticated() && ( 
        <li className="nav-item">
          <Link  style={currentTab(history, "/user/signup")} className="nav-link" to="/user/signup">Signup</Link>
        </li>
        )}
        {!isAutheticated() && ( 
       <li className="nav-item">
          <Link  style={currentTab(history, "/user/signin")} className="nav-link" to="/user/signin">Signin</Link>
        </li>
   
       )}
       {isAutheticated() && (
        <li className="nav-item">
          <span
            className="nav-link  text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
      </ul>
      {isAutheticated() && (<form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      )}
    </div>
  </nav>
);

export default withRouter(Menu);
