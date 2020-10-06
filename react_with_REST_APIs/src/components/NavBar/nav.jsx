import React from 'react';


function Navbar(props) {

    return (
        <div className={props.position}>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <a className="navbar-brand nav_title" href="/">O(1)  Club</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav nav_item">
                        <a className="nav-item nav-link zoom" style={{color:props.color}} href="/"><i className="fas fa-home"></i>  Home</a>
                        <a className="nav-item nav-link zoom" style={{color:props.color}} href="/blogs/"><i className="fas fa-blog"></i>  Blogs</a>
                        <a className="nav-item nav-link zoom" style={{color:props.color}} href="/placement/"><i className="fas fa-briefcase"></i>  Placement</a>
                        <a className="nav-item nav-link zoom" style={{color:props.color}} href="/contest/"><i className="fas fa-code"></i>  Online Contest</a>
                        <a className="nav-item nav-link zoom" style={{color:props.color}} href="/subscribe/"><i className="fas fa-envelope"></i>  Subscribe</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

