import React from 'react'
import APIblog from './API_viewplacement'
import Placement_create from './Placement_create'
import Placement_create_form from './Placement_create_form'
import AnchorLink from 'react-anchor-link-smooth-scroll'

function Blog_body() {
    return (
        <div className="container" id="placement_body">
            <div className="row">
            <AnchorLink className="btn btn-dark btn-lg btn-round " href="#createblog" role="button" style={{margin:"10px", borderRadius:"50px"}}>Share Your Experience</AnchorLink>
            </div>
            <div className="row">

                <div className="col col-xl-8 col-12 ">
                    <APIblog />
                </div>
                <div className="col col-xl-4 col-12 " id="createblog">
                    <Placement_create />
                    <div className="modal fade"  id="exampleModalCenter" tabIndex="-1" role="dialog"  aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"  role="document">
                            <div className="modal-content" style={{borderRadius:"50px", padding:"40px"}}>
                                <div className="modal-header">
                                    <h3 className="modal-title" id="exampleModalLongTitle">Share Your Placement Experience</h3>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body" >
                                    <Placement_create_form/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Blog_body
