import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';

const styles = {
    root: props => ({
        color: props.iconColor ? props.iconColor : '#1976d2',
        ...props.iconStyles
    })
}

class Iconbutton extends React.Component {

    render = () => <IconButton aria-label='icon-btn' color='default' disabled={this.props.disabled} {...this.props}>
        {this.props.icon}
    </IconButton>;
}

export default withStyles(styles)(Iconbutton);