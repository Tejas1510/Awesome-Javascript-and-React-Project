import React, { useState } from 'react'
import Axios from "axios"
function AdminView(props) {

    // const [message, fetchMessage] = useState({ message: "", status: "none" });

    // function deletee(id) {
    //     if (props.type === "BLOGS") {
    //         alert("Do you want to delete this Blog!!")
    //         Axios.post(`https://o1codingclub.herokuapp.com/blog/delete/${id}`, { key: props.keys }).
    //             then((response) => {
    //                 fetchMessage({ ...message, message: response.data, status: "VALID" });

    //             }).
    //             catch(function (error) {

    //                 console.log(error)
    //                 fetchMessage({ ...message, message: error.response.data, status: "INVALID" })
    //             });



    //     }
    //     else {
    //         alert("Do you want to delete this Placement Blog!!")
    //         Axios.post(`https://o1codingclub.herokuapp.com/placement/delete/${id}`, { key: props.keys }).
    //             then((response) => {
    //                 fetchMessage({ ...message, message: response.data, status: "VALID" })
    //                 // props.callback()
    //             }).
    //             catch(function (error) {

    //                 console.log(error)
    //                 fetchMessage({ ...message, message: error.response.data, status: "INVALID" })
    //             });

    //     }
    // }

    // function approvee(id) {
    //     if (props.type === "BLOGS") {
    //         alert("Do you want to approve this Blog!!")
    //         Axios.post(`https://o1codingclub.herokuapp.com/blog/approve/${id}`, { key: props.keys }).
    //             then((response) => {
    //                 fetchMessage({ ...message, message: response.data, status: "VALID" })
    //             }).
    //             catch(function (error) {

    //                 fetchMessage({ ...message, message: error.response.data, status: "INVALID" })
    //             });

    //     }
    //     else {
    //         alert("Do you want to approve this Placement Blog!!")
    //         Axios.post(`https://o1codingclub.herokuapp.com/placement/approve/${id}`, { key: props.keys }).
    //             then((response) => {
    //                 fetchMessage({ ...message, message: response.data, status: "VALID" })
    //             }).
    //             catch(function (error) {

    //                 fetchMessage({ ...message, message: error.response.data, status: "INVALID" })
    //             });

    //     }
    // }






    const list = props.data.map((item) =>
        (
            <div className="card shadow-lg" key={item.id}>
                <div className="card-body">
                    <h1 className="card-title">{item.title}</h1>
                    <p className="card-text" style={{ fontSize: 20 }}>{item.body}</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Username- {item.fullname}</li>
                        <li className="list-group-item">Author - {item.author}</li>
                        <li className="list-group-item">Email - {item.email}</li>
                        <li className="list-group-item">College - {item.college}</li>
                        <li className="list-group-item">Branch - {item.email}</li>
                        <li className="list-group-item">Publish Date- {item.time}</li>
                    </ul>
                    {
                        item.status === 0 &&
                        <>
                            <span style={{ display: "inline", margin: "5px" }}><button type="button" className="btn btn-success" onClick={() => props.callbackk(item.id, props.type, 'approve')}>Approve</button></span>
                            <span style={{ display: "inline", margin: "5px" }}><button type="button" className="btn btn-danger" onClick={() => props.callbackk(item.id, props.type, 'delete')}>Delete</button></span>
                        </>
                    }
                    {
                        item.status === 1 &&
                        <span style={{ display: "inline", margin: "5px" }}><button type="button" className="btn btn-danger" onClick={() => props.callbackk(item.id, props.type, 'delete')}>Delete</button></span>
                    }
                </div>
            </div>

        ))



    return (
        <div>

            <h3 style={{ display: "block", textAlign: "center", margin: "20px" }}>{props.type}</h3>
            {list}
        </div>
    )
}

export default AdminView
