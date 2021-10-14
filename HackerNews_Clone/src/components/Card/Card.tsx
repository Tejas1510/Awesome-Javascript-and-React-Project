import React from "react"
import "./Card.css"
import {BsClock} from "react-icons/bs"
import {News} from "../App/AppTypes"

const Card:React.FC<News> = ({title,text,url,time,kids}) => {
  return (
   <a href={url} style={{textDecoration:"none",color:"var(--gray-ft)"}} rel="noopener noreferrer" target="_blank">
    <div className="card" >
      <div className="card_body">
        <h3 className="card_header">{title?title:"---"}</h3>
        <p className="card_description">{text?text:"---"}</p>
      </div>
      <div className="card_footer">
        <p className="card_footer__detail"><BsClock style={{verticalAlign:"middle",fontSize:"1.2rem"}}/>{` ${new Date(time).getMinutes().toLocaleString()} Min`} | {`${kids && kids.length > 0 ? kids.length : 0} comments` }</p>
      </div>
    </div>
    </a>
    
  )
}

export default Card
