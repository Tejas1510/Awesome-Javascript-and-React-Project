import React, { Component } from "react"

class Welcome extends React.Component {
    constructor(){
        super()
        this.state={
            count:0
        }
    }
    increas=()=>{
        this.setState({count:this.state.count+1})
    }


    render() {
      return (<>
            <h1>this is no {this.state.count} click</h1>
            <button className="btn-success"  onMouseOver={this.increas}>Click Me</button>
            
      
      </>)
    }
  }

  export default Welcome