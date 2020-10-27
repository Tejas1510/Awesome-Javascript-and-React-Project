import React, { Component } from 'react'
import './List.css'

class List extends Component {
    

    handleClick = (emoji) =>{

        // code to coy emogi to clipboard
        navigator.clipboard.writeText(emoji.character)
       alert( "Copied to clipboard" + emoji.character)
    }    
    render() {
    
        const  allEmojis = this.props.data
        
        if(!allEmojis){ 
            return  (
                        <tr>Loading...</tr>
                )
        }
    
    return (
    
        <div className="container list-container table-responsive shadow" >
            <table className="table table-hover bg-white border-0">
            <thead className="bg-light">
            <tr>
                <th scope="col"><b>#</b></th>
                <th scope="col">Character</th>
                <th scope="col">Name</th>
            </tr>
            </thead>
            <tbody>
                {
                    allEmojis.map((emoji,index)=>{
                        return (
                            <tr key={index} onClick={()=>this.handleClick(emoji)} >
                                <th scope="row">{index}</th>
                                <td >{emoji.character}</td>
                                <td>{emoji.unicodeName}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </div>
    )
    }
}

export default List
