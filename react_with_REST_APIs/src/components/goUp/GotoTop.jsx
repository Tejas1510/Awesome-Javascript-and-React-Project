import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
function GotoTop(props) {
    return (
        <div className="" style={{position:"fixed", bottom:"10px", right:"10px"}}>
            <AnchorLink className="btn main_btn1 shadow" href={`#${props.idd}`} role="button"><i className="fas fa-chevron-circle-up"></i></AnchorLink>
        </div>
    )
}

export default GotoTop
