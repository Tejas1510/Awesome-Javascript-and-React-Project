import React from "react"
import {v4 as uuidv4} from "uuid"
import Card from "../Card/Card"
import "./Cardlist.css"
import {News} from "../App/AppTypes"

type story={
  stories:News[],
  
}

const Cardlist:React.FC<story> = ({stories}) => {
  return (
    <main className="container">
      <div className="card_list">
            { stories.map((value:News)=> <Card key={uuidv4()} {...value}/> )}     
      </div>
    </main>
  )
}

export default Cardlist
