import { ReactNode } from "react";

const Shimmer:React.FC<ReactNode> = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer"></div>
    </div>
  )
}

export default Shimmer;