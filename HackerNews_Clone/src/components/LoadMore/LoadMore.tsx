import React from 'react'
import {News} from "../App/AppTypes"

type loadmore={

  callback:React.MouseEventHandler,
  lastIndex:number,
  stories:News[],
  totalNumberOfStories:number
}
const LoadMore:React.FC<loadmore> = ({callback,lastIndex,stories,totalNumberOfStories}):React.ReactElement => {
  return (
    <>
      {stories.length>0 &&
        <div className="container">
         <button className="button"  onClick={callback} style={{display:`${lastIndex && lastIndex>=totalNumberOfStories?"none":"block"}`}}>Load more</button>
        </div>
         }
    </>
  )
}

export default LoadMore
