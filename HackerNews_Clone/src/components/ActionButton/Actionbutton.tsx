import React from "react"
import "./Actionbutton.css"

type button={
  isActive:boolean,
  text:string
}
const Actionbutton:React.FC<button> = (props) => {
  return (
    <button className={`btn ${props.isActive?"active":""}`}>
      {props.text}
    </button>
  )
}

export default Actionbutton;
