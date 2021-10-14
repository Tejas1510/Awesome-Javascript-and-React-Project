import React, { ReactNode } from 'react'
import Shimmer from './Shimmer'
import Skeleton from './Skelaton'

const NewsSkelaton:React.FC<ReactNode> = ()=> {
  const themeClass = 'light'

  return (
    <div className={`skeleton-wrapper ${themeClass} container`}>
      <div className="skeleton-article">
        <Skeleton type="title" />
        <Skeleton type="text" />
        <Skeleton type="text" />
        <div style={{display:"flex", gap:"0.5rem"}}>

        <Skeleton type="circle" />
        <Skeleton type="smalltext" />
        </div>
      </div>
      <Shimmer />
    </div>
  )
}

export default NewsSkelaton;