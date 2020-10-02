import React from 'react'
import create_img from '../../media/create_img.jpg'
function Blog_create() {
    return (
        <div className="sticky-top">
            <div className="card shadow-lg text-center" style={{width:"100%", top:"100px"}}>
                <img src={create_img} className="card-img-top" alt=""></img>
                <div className="card-body">
                    <h1 className="card-title">CREATE NEW BLOG</h1>
                    <p className="card-text" style={{ fontSize: 20 }}>Hey there!! Want to post your blog please click here, and it will redirect you to form!!</p>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                        CLICK HERE
                    </button>
                </div>
            </div>
            
            
        </div>

    )
}

export default Blog_create
