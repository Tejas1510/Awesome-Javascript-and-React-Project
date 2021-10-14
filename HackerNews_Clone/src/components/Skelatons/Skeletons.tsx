import React from 'react'
import NewsSkeleton from "./NewsSkelaton"

type skeleton={
  numberOfSkeleton?:number
  
}

const Skeletons:React.FC<skeleton> = ({numberOfSkeleton=5}) => {
  return (
    <>
      { Array.from(Array(numberOfSkeleton).keys()).map((value) => <NewsSkeleton key={value} />)}
    </>
  )
}

export default Skeletons
