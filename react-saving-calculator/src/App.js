import React from 'react';

import Header from './components/Header';
import CalculatorForm from './components/CalculatorForm';
import ResultTable from './components/ResultTable';
import DataChart from './components/DataChart';

class App extends React.Component {
  state = {
    result: []
  }
  sendResult = (data) => {
    this.setState({
      result: data
    })
  }

  renderTable = () => {
    if (this.state.result.length > 0) {
      return <ResultTable data={this.state.result} />;
    }
  }

  renderChart = () => {
    if (this.state.result.length > 0) {
      return <DataChart data={this.state.result} />;
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Header />
        <CalculatorForm sendResult={this.sendResult} />
        {this.renderChart()}
        {this.renderTable()}
      </div>
    )
  }
};

export default App;