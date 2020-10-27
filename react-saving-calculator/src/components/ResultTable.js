import React from 'react';

import ResultTableItem from './ResultTableItem';

class ResultTable extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Year</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map((item, i) => <ResultTableItem year={item.year} amount={item.amount} salary={item.salary} />)}
                        </tbody>
                    </table>
                </div >
            </div>
        )
    }
}

export default ResultTable;