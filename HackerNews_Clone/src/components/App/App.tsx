import React,{useEffect,useReducer} from "react"
import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getStoryByType,getStories} from "../../API/Methods"
import Error from "../Error/Error";
import Skeleton from "../Skelatons/Skeletons"
import {Match,actionType,News} from "./AppTypes"
import {reducer} from "./Reducer"
import Loadmore from "../LoadMore/LoadMore"
import { initialState, STORY_PERPAGE } from "./Constant";



const App:React.FC<Match> =({match})=>{
  const STORY_TYPE_FROM_PARAMS=match.params.storytype
  const [state, dispatch] = useReducer(reducer, initialState);
  const {storyType,storyIds,stories,isloading,error,currentPage}=state

  const lastIndex=currentPage * STORY_PERPAGE
  const firstIndex=lastIndex-STORY_PERPAGE

  const loadHandler:React.MouseEventHandler=()=>{
    dispatch({type:actionType.SET_CURRENT_PAGE})
    window.scrollTo({
      top: window.pageYOffset-500,
      behavior: "smooth"
    });
  }

  
  useEffect(()=>{
    dispatch({type:actionType.SET_LOADING})
    getStoryByType(storyType)
    .then((res:number[])=>{
      dispatch({type:actionType.SET_STORY_IDS,payload:{storyIds:res}})
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.RESET_ERROR})
    })
    .catch(()=>{
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.SET_ERROR})
    })
  },[storyType])
  

  useEffect(()=>{
    if (storyType !== STORY_TYPE_FROM_PARAMS) {
      dispatch({type:actionType.RESET_STATE})
      dispatch({type:actionType.SET_STORY_TYPE,payload:{storyType: STORY_TYPE_FROM_PARAMS}})
  }
  },[storyType, STORY_TYPE_FROM_PARAMS])
  
  
  useEffect(()=>{
   dispatch({type:actionType.SET_LOADING})
   getStories(storyIds,firstIndex,lastIndex)
   .then((res:News[])=>{
      dispatch({type:actionType.SET_STORIES,payload:{stories:res}})
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.RESET_ERROR})
   })
   .catch(()=>{
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.SET_ERROR})
    })
  },[storyIds,firstIndex,lastIndex])

  
    return(
      <>
        
        {isloading && <Skeleton />}
        {!isloading && 
         <Cardlist stories={stories}/>
         }
        
        <Error message={error}/>
        {!isloading && storyIds.length>0 && !error && <div className="container">Page: {currentPage} / {Math.ceil(storyIds.length/STORY_PERPAGE)}</div>}
        
        {!isloading && <Loadmore callback={loadHandler} lastIndex={lastIndex} totalNumberOfStories={storyIds.length} stories={stories} />}
      </>
    )
  
}
export default App