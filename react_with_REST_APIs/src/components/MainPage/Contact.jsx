import React from 'react'

function Contact() {
    return (

        <>
            <br />
            <br />
            <br />
            <div className="jumbotron">
                <h1 className="display-4">Contact Us</h1>

                <hr className="my-4" />

                <p className="lead">

                    <form>
                        <div className="form-group">
                            <label for="fullname">Full Name</label>
                            <input type="text" className="form-control" id="fullname" aria-describedby="emailHelp" />
                        </div>
                        <div className="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Summary</label>
                            <textarea type="text" className="form-control" id="title" rows="10" placeholder="Write here......" />
                        </div>

                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>

                </p>
            </div>
        </>

    )
}

export default Contact
