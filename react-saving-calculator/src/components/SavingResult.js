import React from 'react';

import ResultTable from './ResultTable';

class SavingResult extends React.Component {
    render() {
        return (
            <div>
                <ResultTable data={this.props.data} />
            </div>
        )
    }
}

export default SavingResult;