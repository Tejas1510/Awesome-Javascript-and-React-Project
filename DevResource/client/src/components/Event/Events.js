import React,{useState,useEffect} from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FileBase from 'react-file-base64';
import {v4 as uuidv4} from 'uuid';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {IconButton} from '@material-ui/core'
import axios from 'axios'
import ReactTooltip from 'react-tooltip';
import Tooltip from '@material-ui/core/Tooltip'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {CircularProgress,LinearProgress } from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // ES6
// import Pulse from 'react-reveal/Pulse';
import './style.css'
const Events = () => {

    const notify = () => toast("Wow so easy!");

    const[events,setEvent]=useState(
        {
            title:"",
            description:"",
            link:"",
            selectedFile:"",
        }
    )
    const [eventArray,setEventArray]=useState([]);
    const[selectedEvent,setSelectedEvent] = useState("");
    const[isEditing,setIsEditing] = useState(false);

    useEffect(() =>{
        axios.get('http://localhost:8000')
        .then(response=>setEventArray(response.data))
    },[])

    console.log("This is the event array",eventArray)

    const submitHandler =(e) =>{

        if(isEditing) {
            const updatedEventsArray = eventArray.map((event) => {
                if(event._id === selectedEvent) {
                    axios.patch(`http://localhost:8000/${event._id}`,events)
                    return events;
                } else {
                    axios.patch(`http://localhost:8000/${event._id}`,event)
                    return event;
                }
            });
            console.log("The updated information is ",updatedEventsArray)
            setEventArray(updatedEventsArray);
            setIsEditing(false);
            setSelectedEvent("");
            
        } else  {
            console.log("event array",events)
            const newEvent = {...events, id:uuidv4()};
            axios.post('http://localhost:8000',newEvent)
            setEventArray([...eventArray,newEvent]);
        }
        setEvent({
            title:"",
            description:"",
            link:"",
            selectedFile:"",
        });
        e.preventDefault();
    }

    const deleteEvent =(key)=>{

        axios.delete(`http://localhost:8000/${key}`)
        const filteredEvent = eventArray.filter((eventArray)=>key!==eventArray._id)
        setEventArray(filteredEvent)
    }

    const updateEvent= (key) =>{
        const filteredEvent = eventArray.filter((eventArray)=>key===eventArray._id)[0]
        setEvent(filteredEvent);
    }

    // useEffect(() => {
    //     setEventArray(eventArray)
    // }, [])
    const msg="A curated list of resources for developers accross the globe to get started with their developement Journey"
    return (
        
        !eventArray.length ? <CircularProgress style={{marginTop:'270px'}}/> : (
        <div>
               {/* <Pulse> */}
             <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Resources</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={(e) => submitHandler(e)}>
                        <div className="form-group">
                            <label for="recipient-name" className="col-form-label" style={{fontWeight:'500',fontSize:'20px'}}>Title</label>
                            <input type="text" className="form-control" id="recipient-name" 
                            value={events.title}
                            placeholder="Enter Title of Resource"
                            onChange={(e)=>setEvent({...events,title:e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label for="message-text" className="col-form-label" style={{fontWeight:'500',fontSize:'20px'}}>Content</label>
                            <ReactQuill className="form-control" id="message-text"
                            value={events.description}
                            // placeholder="Enter short description of resource"
                            onChange={(e)=>setEvent({...events,description:e.target.value})}
                            ></ReactQuill>
                        </div>
                        <div className="form-group">
                            <label for="message-text" className="col-form-label" style={{fontWeight:'500',fontSize:'20px'}}>Link</label>
                            <textarea className="form-control" id="message-text"
                            value={events.link}
                            placeholder="Enter link to the resource"
                            onChange={(e)=>setEvent({...events,link:e.target.value})}
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
            {/* </Pulse>  */}
            {/* <a className="btn btn-primary btn-sm addEvent" data-toggle="modal" data-target="#exampleModal" ><i className="fa fa-plus"></i></a> */} 
            <nav className="navbar navbar-dark navbar-expand-sm bg-primary  fixed-top">
        <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" style={{fontWeight:'bold'}} >DevResources</a>
            <div className="collapse navbar-collapse" id="Navbar">
                <ul className="navbar-nav ml-auto">
                {/* Add Event Button */}
                <li className="nav-item mr-2"><NavLink className="nav-link" to="/" >Home</NavLink></li>
    <button className="btn btn-primary btn-sm addEvent"  data-tip data-for="addTip"  data-toggle="modal" data-target="#exampleModal" onClick={() => {setEvent(''); setIsEditing(false); setSelectedEvent("");}} ><li className="nav-item mr-2" style={{float:'right',fontSize:'30px',color:'white'}}>
                    +</li></button>
                    {/* <li style={{float:'right',fontSize:'20px',color:'white'}} className="nav-item mr-2" >Login</li> */}
                </ul>
            </div>
           
        </div>
    </nav>
                <div id = "cards_landscape_wrap-2">
                <div className="container-fluid">
                    <h4 className="text-center pb-2 pt-5 mt-5" data-aos="fade-up" data-aos-delay="300" data-tip="hello world" style={{fontSize:'30px'}}><span style={{color:'rgb(255, 90, 110)'}}>DEV</span> Resources List</h4>
                    {/* <div> className="typewriter" */}
                    <div>
                        <p className="text-center subHeading" style={{fontSize:'20px'}}>{msg}</p>
                    </div>
                    <div className="row moocs">
                    {/* id, title, content, link, selectedFile */}
                      {eventArray.map((event)=>(
                            <Card event={event}/>
                      ))}  
                    </div>
                </div>
                </div>
            </div>
        )
    
    )

    function Card({event}) {

        const [settingsOption, setSettingsOption] = useState(false);

        return (
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" data-aos="fade-up" data-aos-easing="linear" data-aos-delay="600" > 
                <div className="card-flyer mb-5">
                    <div className="text-box">
                        <div className="image-box">
                            <img src={event.selectedFile} alt="" />
                    
                        </div>
                        <div className="overlay2">
                            {
                                settingsOption ?
                                <div style={{display: "flex", flexDirection: "column", alignItems: "space-between"}}>
                                 <Tooltip title="Close" placement="right-center">
                                    <IconButton
                                    style={{ color: "white", }}
                                    onClick={() => setSettingsOption(false)}>
                                    <CloseIcon/>
                                    </IconButton>
                                </Tooltip>
                                {/* Edit */}
                                <Tooltip title="Edit" placement="right-center">
                                    <IconButton
                                    style={{ color: "white",   }}
                                    onClick={() =>{setSettingsOption(false); setIsEditing(true); setSelectedEvent(event._id); updateEvent(event._id)}}
                                    
                                    >
                                    
                                    <EditIcon data-toggle="modal" data-target="#exampleModal"/>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Delete" placement="right-center">
                                    <IconButton
                                    style={{ color: "white",   }}
                                    onClick={() => {deleteEvent(event._id);setSettingsOption(false);}}
                                    data-tip data-for="deleteTip"
                                    >
                                    <DeleteIcon onClick={notify}/>
                                    <ToastContainer/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            :
                            <IconButton
                            style={{ color: "white" }}
                            onClick={() => setSettingsOption(true)}
                            >
                            <MoreVertIcon fontSize="default" />
                            </IconButton>

                            }
                        </div>
                        <div className="text-container">
                        <a href={event.link} target="_blank"><h6>{event.title}</h6></a>
                        <p>{event.description}</p>
                        </div>
                    </div>
                </div>
                <ReactTooltip  id="addTip" data-place="right" data-type="dark" effect="solid">
                Add a new Resource
            </ReactTooltip>
            
            </div>
        )
    }
}

export default Events

