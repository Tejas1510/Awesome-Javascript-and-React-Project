import React from "react"
import {NavLink} from "react-router-dom"

type error={
  message:string,
}
const Error:React.FC<error> = ({message}) => {
  return (
    <>
    {message && <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <h3>
      {message && "No Data Found"}
      </h3>
      <NavLink to="/" style={{textDecoration:"none",marginLeft:"0.5rem"}}>
       <button className="button">Go Back</button>
      </NavLink>
    </div> }
    </>
  )
}

export default Error
