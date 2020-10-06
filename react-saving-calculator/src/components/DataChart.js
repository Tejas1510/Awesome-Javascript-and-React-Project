import React from 'react';

import { LineChart, Line, YAxis, Tooltip, Legend, CartesianGrid, XAxis, ResponsiveContainer, ReferenceLine } from 'recharts';

class DataChart extends React.Component {

    getMax = () => {
        const d = this.props.data[this.props.data.length - 1];
        return Math.max(d.amount, d.salary);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12" >
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={this.props.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <ReferenceLine y={this.getMax()} label="Max" stroke="red" strokeDasharray="3 3" />
                            <Line type="linear" dataKey="amount" stroke="#8884d8" />
                            <Line type="monotone" dataKey="salary" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div >
            </div>
        )
    }
}

export default DataChart;