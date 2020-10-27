import React, { Component } from 'react'
import './SearchList.css'

class SearchList extends Component {
    
   
    
    handleInput = (event) => {
       this.props.handleQuery(event)
    }
    
    render() {
       
        return (
            <div className="input-container">

                    <input className="input shadow" type="text" value={this.props.query} onChange={ this.handleInput} placeholder="Search or click to copy any emogi"/>
                                
            </div>
        )
    }
}

export default SearchList
