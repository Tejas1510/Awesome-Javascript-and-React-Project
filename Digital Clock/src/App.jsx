import React, { useState }  from "react";


const App=()=>{
    const [txt,setTxt] = useState("")
    const [fullTxt,setFullTxt] =useState();
    const inputEvent=(event)=>{
      
      setTxt(event.target.value);

    }
    const onSubmit=()=>{
     setFullTxt(txt);
    }
    return (
    <>
       <div>
           <h1>Hello {fullTxt}</h1>
           <input type='text' placeholder="Enter Your Name" onChange={inputEvent} value={txt}/>
           <button onClick={onSubmit}>Click Me</button>

       </div> 
    </>
    );
}
export default App;