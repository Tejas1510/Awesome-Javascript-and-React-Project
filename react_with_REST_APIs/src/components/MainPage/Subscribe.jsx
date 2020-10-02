import React, { useState } from 'react'
import create_img from '../../media/create_img.jpg'
import Axios from 'axios'
function Subscribe() {

    const [formbody, setBody] = useState({ email: "", key: "" });
    const [message, fetchMessage] = useState({ message: "", status: "none" });

    const verifymail = (e) => {
        e.preventDefault()

        Axios.post("https://o1codingclub.herokuapp.com/mail/verify/", { email: formbody.email }).
            then((response) => {
                fetchMessage({ ...message, message: response.data, status: "DONE" })
                
            }).
            catch(function (error) {

                fetchMessage({ ...message, message: error.response.data, status: "INVALID" })
            });

    }

    const submithandler = (e) => {
        e.preventDefault()

        Axios.post("https://o1codingclub.herokuapp.com/mail/add/", 
        {
             email: formbody.email,
             'key' : formbody.key 
        }).
            then((response) => {
                fetchMessage({ ...message, message: response.data, status: "DONE" })
                setBody({ ...formbody, email: '', key:'' })

                
                setTimeout(()=>{fetchMessage({ ...message, message: '', status: "none" })}, 5000)
            }).
            catch(function (error) {

                fetchMessage({ ...message, message: error.response.data, status: "INVALID" })
            });

    }

    return (
        <div>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={`shadow sticky-top alert alert-${message.status === 'VALID' || message.status === 'DONE' ? 'success' : 'warning'}  fade show ${message.status === 'none' ? 'condition1' : 'condition2'}`}
                            role="alert" style={{ borderRadius: "50px" }}>
                            <strong>{message.status}</strong> {message.message}

                        </div>
                        <div className="card shadow-lg text-center" style={{ width: "100%", top: "100px" }}>

                            <div className="card-body">
                                <h2 className="card-title" style={{ width: "100%" }}>Subscribe Here!!</h2>
                                <p className="card-text" style={{ fontSize: 20 }}>Hey there!! Want alert regarding placement experience, latest blogs, and all contest?? please click here, To Subscribe!!</p>
                                <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#subscribe">
                                    Subscribe
                                </button>
                            </div>
                            <img src={create_img} className="card-img-top" alt=""></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="subscribe" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
                    <div className="modal-content" style={{ borderRadius: "50px", padding: "40px" }}>
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLongTitle">Fill The Form</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" >
                            <form onSubmit={submithandler}>
                                <div className="form-group">
                                    <label htmlFor="email">email</label>
                                    <input type="email" className="form-control" id="email"
                                        value={formbody.email}
                                        onChange={(e) => setBody({ ...formbody, email: e.target.value })} />
                                </div>
                                {
                                    message.status === 'none' &&
                                        <button type="button" className="btn btn-primary" onClick={verifymail}>Validate</button>
                                }
                                {
                                    message.status !== 'none' || message.status == 'invalid' &&
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="title">key</label>
                                            <input type="password" className="form-control" id="title"
                                                value={formbody.key}
                                                onChange={(e) => setBody({ ...formbody, key: e.target.value })} />
                                        </div>

                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </>
                                }

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Subscribe
