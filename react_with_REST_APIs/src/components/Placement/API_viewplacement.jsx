import React, { Component } from 'react'
import loading from '../../media/loading.gif'
export class APIblog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {

    fetch("https://cors-anywhere.herokuapp.com/https://o1codingclub.herokuapp.com/placement/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            error: false
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error: true

          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    
    // console.log(items)
    if (isLoaded && !error) {
      var newscard = items.map(item => (

        <div className="card shadow-lg" key={item.title}>
          <img src="https://source.unsplash.com/1600x900/?coding,black" className="card-img-top" alt=""></img>
          <div className="card-body">
            <h1 className="card-title">{item.title}</h1>
            <p className="card-text" style={{ fontSize: 20 }}>{item.body}</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Author - {item.author}</li>
              <li className="list-group-item">Email - {item.email}</li>
              <li className="list-group-item">Username- {item.fullname}</li>
            </ul>
          </div>
        </div>

      ))
    }
   
    

    return isLoaded ?
      <div>
        {newscard}
      </div>
      :
      <div className="loading">
        <img className="shadow" src={loading} alt=""/>
      </div>

    
  }
}

export default APIblog
