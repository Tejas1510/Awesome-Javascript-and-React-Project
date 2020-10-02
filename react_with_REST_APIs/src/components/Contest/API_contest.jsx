import React, { Component } from 'react'
import loading from '../../media/loading.gif'

export class APIcontest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    // console.log("executed")

    fetch("https://cors-anywhere.herokuapp.com/https://o1codingclub.herokuapp.com/contest/")
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

  convertDatetime(date)
  {
    var d = new Date(date);
    var n = d.toString();

    return n;
  }

  render() {
    const { error, isLoaded, items } = this.state;

    // console.log(items)
    if (isLoaded && !error) {
      var newscard = items.map(item => (

        <div className="card mb-3 shadow" style={{ width: "100%" }} key={item.name}>
          <div className="row no-gutters">
            <div className="col-md-4">
            <img src={`https://source.unsplash.com/400x200/?coding,programming,${item.name}`} className="card-img" alt=""></img>
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">{item.name} by {item.platform}</h2>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>startTime -</strong> {this.convertDatetime(item.startTime)}</li>
                  <li className="list-group-item"><strong>endTime -</strong> {this.convertDatetime(item.endTime)}</li>
                  <li className="list-group-item"><strong>platform -</strong> {item.platform}</li>
                </ul>
                <a href={item.url} style={{ margin: "10px", textAlign: "center" }} className="btn btn-primary">Explore</a>
              </div>
            </div>
          </div>
        </div>

      ))
    }

    return isLoaded ?
      <div>
        {newscard}
      </div>
      : 
      <div className="loading_contest">
        <img className="shadow" src={loading} alt="" />
      </div>
  }
}

export default APIcontest
