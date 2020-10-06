import React from 'react';
import {Link} from 'react-router-dom';
const SideNav = () => {
    return (
     <div className="card">
        <h4 className="card-header bg-dark text-white">Nav</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/" className="nav-link text-success">
              New Task
            </Link>
           <Link to="/" className="nav-link text-success">
              New Label 
            </Link>
          </li>
        
        </ul>
      </div>
    );
}
 
export default SideNav;