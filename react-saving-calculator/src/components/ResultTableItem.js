import React from 'react';

class ResultTableItem extends React.Component {


    render() {
        return (
            <tr key={this.props.year}>
                <th>{this.props.year}</th>
                <td>{this.props.amount}</td>
                <td>{this.props.salary}</td>
            </tr>
        )
    }
}

export default ResultTableItem;