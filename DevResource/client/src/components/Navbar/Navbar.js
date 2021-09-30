import React,{useState} from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import FileBase from 'react-file-base64';
import {v4 as uuidv4} from 'uuid';
import "bootstrap/dist/js/bootstrap.bundle";
import Event from '../Event/Events'
import { NavLink } from 'react-router-dom';
const Navbar = () => {

    const[events,setEvent]=useState(
        {
            // img:"",
            name:"",
            message:"",
            selectedFile:"",
        }
    )
    const [eventArray,setEventArray]=useState([{
        // img:"",
        name:"",
        message:"",
        selectedFile:"",
    }])

    const submitHandler =(e) =>{
        console.log("hi")
        const newEvent={...events,id:uuidv4()}
        setEventArray([...eventArray,newEvent])
        console.log(eventArray)
        e.preventDefault()
    }

  return (
    <div>
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Birthday</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={(e) => submitHandler(e)}>
                        <div className="form-group">
                            <label for="recipient-name" className="col-form-label">Name</label>
                            <input type="text" className="form-control" id="recipient-name" 
                            value={events.name}
                            onChange={(e)=>setEvent({...events,name:e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label for="message-text" className="col-form-label">Message</label>
                            <textarea className="form-control" id="message-text"
                            value={events.message}
                            onChange={(e)=>setEvent({...events,message:e.target.value})}
                            ></textarea>
                        </div>
                        <div className="form-group">
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64}) =>setEvent({...events,selectedFile:base64})} 
                        />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" value="submit" onClick={(e)=>submitHandler(e)} className="btn btn-primary" data-dismiss="modal">Submit</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        <nav className="navbar navbar-dark navbar-expand-sm bg-primary  fixed-top">
        <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" >DevResources</a>
            <div className="collapse navbar-collapse" id="Navbar">
                <ul className="navbar-nav ml-auto">
                <a className="btn btn-primary btn-sm addEvent" data-toggle="modal" data-target="#exampleModal" ><li className="nav-item mr-2" style={{float:'right',fontSize:'30px',color:'white'}}>+</li></a>
                </ul>
            </div>
           
        </div>
    </nav>
    <Event eventArray={eventArray} updateArray={setEventArray}/>
    </div>
  )
}

export default Navbar
