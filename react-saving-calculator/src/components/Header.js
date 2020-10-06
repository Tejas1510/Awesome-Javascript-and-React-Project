import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1 className="text-center" style={{ fontSize: '24px', margin: '30px 0' }}>Saving Calculator</h1>
                </div>
            </div>
        )
    }
}

export default Header;