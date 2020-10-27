import React ,{useState}from "react"
import Axios from 'axios'

function Login(){

    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    const submit = ()=>{
      Axios.post('http://localhost:3001/api/insert',{
        email:email,
        password:password,
    }).then(()=>{
      alert("inserted");
  });
  
    };
     
  
      return (<> 

<form className="row jumbotron">
        <div className="col-sm-6 form-group">
            <label className="text-dark" >Name</label>
            <input type="text" className="form-control" name="name"placeholder="Enter your  name." required onChange={(e)=>{
              setemail(e.target.value);
            }}/>
        </div>

        <div className="col-sm-6 form-group">
            <label  className="text-dark" >Password</label>
            <input type="text" className="form-control" name="password"placeholder="Enter password." required  onChange={(e)=>{
              setpassword(e.target.value);
            }}/>
        </div>

        <div>
                <label  className="text-dark" >UPLOAD</label>
                <input type="file" className="form-control" accept='.jpg ' onChange={(e)=>{
              upload(e.target.value);
            }}></input>

        </div>

        <div style={{alignContent:'left'}}>
                <button  onClick={submit}  type="submit"   className="btn btn-primar " >Submit</button>
        </div>
                    
        </form>
            
             
      
      </>)
    
  }

  export default Login