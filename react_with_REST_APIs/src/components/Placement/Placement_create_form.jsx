import Axios from 'axios';
import React, { useState, useEffect } from 'react'


function Blog_create_form() {

    const formdata = { fullname: "", branch: "", college: "", email: "", body: "", title: "", author: "", key: "" }
    const [blog, setBlog] = useState(formdata);
    const [isvisible, IsVisible] = useState("none");
    const [message, fetchMessage] = useState({ message: "", status: "none" });




    const submithandler = (e) => {
        e.preventDefault()
        Axios.post("https://o1codingclub.herokuapp.com/placement/create/",
            {
                author: blog.author,
                title: blog.title,
                body: blog.body,
                email: blog.email,
                college: blog.college,
                branch: blog.branch,
                fullname: blog.fullname,
                key: blog.key
            })
            .then
            ((response) => {
                // console.log(response)
                fetchMessage({ ...message, message: response.data + " after review your post will be live!!", status: "VALID" })
                IsVisible("none")
                setBlog(formdata)
                setTimeout(()=>{fetchMessage({ ...message, message: "", status: "none" })}, 10000)

            })
            .catch(function (error) {
                // console.log(error);
                fetchMessage({ ...message, message: error.response.data, status: "INVALID" })
            });

    }

    const validateuser = (e) => {
        e.preventDefault()
        Axios.post("https://o1codingclub.herokuapp.com/placement/requestkey/",
            {
                fullname: blog.fullname,
                college: blog.college,
                branch: blog.branch,
                email: blog.email

            })
            .then
            ((response) => {

                // console.log(response)
                fetchMessage({ ...message, message: response.data, status: "VALID" })
                IsVisible("block")

            })
            .catch(function (error) {
                // console.log(error.response);
                fetchMessage({ ...message, message: error.response.data, status: "INVALID" })
            });


    }

    // useEffect(() => {
    //     console.log(message)

    // }, [message])






    return (

        <div style={{ padding: "40px" }}>
            <div className={`shadow sticky-top alert alert-${message.status==='VALID' ? 'success' : 'warning'}  fade show ${message.status==='none' ? 'condition1' : 'condition2'}`} 
            role="alert" style={{borderRadius:"50px"}}>
                <strong>{message.status}</strong> {message.message}
                
            </div>
            <form onSubmit={submithandler}>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" className="form-control" id="fullname"
                        value={blog.fullname}
                        onChange={(e) => setBlog({ ...blog, fullname: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="college">College</label>
                    <input type="text" className="form-control" id="college"
                        value={blog.college}
                        onChange={(e) => setBlog({ ...blog, college: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="branch">Branch</label>
                    <input type="text" className="form-control" id="branch"
                        value={blog.branch}
                        onChange={(e) => setBlog({ ...blog, branch: e.target.value })} />
                </div>
                <div className="form-group">
                    <label htmlFor="emailaddress">Email address</label>
                    <input type="email" className="form-control" id="emailaddress" aria-describedby="emailHelp"
                        value={blog.email}
                        onChange={(e) => setBlog({ ...blog, email: e.target.value })} />

                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <br />
                <div>
                    <button type="button" className="btn btn-primary" onClick={validateuser}> Validate </button>
                </div>

                <br />
                <div style={{ display: isvisible }}>
                    <div className="form-group">
                        <label htmlFor="key">Key</label>
                        <input type="password" className="form-control" id="key"
                            value={blog.key}
                            onChange={(e) => setBlog({ ...blog, key: e.target.value })} />

                        <small className="form-text text-muted">Please check your email and enter your key.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="placementtitle">Title</label>
                        <input type="text" className="form-control" id="placementtitle"
                            value={blog.title}
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" id="author"
                            value={blog.author}
                            onChange={(e) => setBlog({ ...blog, author: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Description</label>
                        <textarea type="text" className="form-control" id="title" rows="10" placeholder="Write here......"
                            value={blog.body}
                            onChange={(e) => setBlog({ ...blog, body: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Blog_create_form
