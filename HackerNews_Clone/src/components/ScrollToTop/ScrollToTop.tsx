import React, { useEffect, useState } from "react";
import {AiOutlineArrowUp} from "react-icons/ai"
import "./ScrollToTop.css"

const ScrollToTop:Function=():JSX.Element=> {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility:EventListener = () => {
    if (window.pageYOffset > 468) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop:React.MouseEventHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return ()=>{
      window.removeEventListener("scroll",toggleVisibility)
    }
  }, []);

  return (
    <>
    {isVisible && 
    <div className="scroll-to-top">
        <div onClick={scrollToTop}>
          <AiOutlineArrowUp />
        </div>
        </div>
      }
      </>
  );
}
export default ScrollToTop