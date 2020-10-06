import React from 'react'
import aa from '../../media/aa.jpg'
import bb from '../../media/bb.jpg'
import cc from '../../media/cc.jpg'

function Mainpage() {
    return (
        <>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" >
                    <div className="carousel-item">
                        <img src={aa} className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item active">
                        <img src={bb} className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src={cc} className="d-block w-100" alt="" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="position-absolute heading">
                <div className="card shadow heading_card">
                    <div className="card-body">
                        <h1>Hey There, Welcome TO O(1) Coding Club !!!</h1>
                        <a href="/info/" className="btn btn-light main_btn">
                            <i className="fas fa-mouse"></i>
                        </a>

                        <div><h5>Explore</h5></div>
                    </div>
                </div>
            </div>
            <div className="position-absolute icons">
                <a href="" target="_blank" className="icon_a"><i className="fab fa-facebook"></i></a>
                <a href="" target="_blank" className="icon_a"><i className="fab fa-linkedin-in"></i></a>
                <a href="" target="_blank" className="icon_a"><i className="fab fa-github"></i></a>
                <a href="" target="_blank" className="icon_a"><i className="fab fa-twitter"></i></a>

            </div>
            <div className="shadow" style={{ position: "absolute", bottom: "30px", left: "30px", zIndex: "100" }}>
                <a className="admin_icon" href="/admin/" style={{ color: "#1f1f1f", fontSize: "30px" }}><i className="fas fa-user-shield"></i></a>
            </div>


        </>
    )
}

export default Mainpage
