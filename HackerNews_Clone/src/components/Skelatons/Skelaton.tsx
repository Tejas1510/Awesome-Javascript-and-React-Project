import React from "react"
import './Skelaton.css';

type skeletonProps={
  type:string
}

const Skeleton:React.FC<skeletonProps>=(props) =>{
  const classes = `skeleton ${props.type} `;

  return (
    <div className={classes}></div>
  )
}

export default Skeleton