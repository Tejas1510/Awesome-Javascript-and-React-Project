// A reuseable INPUT component which can be plugged in effectively in your application

import React from 'react';

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core';

const styles = {
    root: props => ({
        '& label': {
            color: 'var(--text)'
        },
        '& .MuiOutlinedInput-input': {
            ...props.rootInputStyles
        },
        '& .MuiInput-input': {
            ...props.rootInputStyles
        },
        '& .MuiOutlinedInput-notchedOutline': {
            boxShadow: 'var(--shadow)',
            transition: 'box-shadow 0.5s ease-in-out, border-color 0.25s ease-in-out'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--text-obscure)',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--theme-color)',
        },
        '& .Mui-focused:before': {
            borderColor: 'var(--theme-color)',
        },
    })
};

class Input extends React.Component {

    render = () => {
        const { placeHolder, value, variant, style } = this.props;

        return <TextField fullWidth placeholder={placeHolder} value={value} variant={variant} style={style}
            {...this.props}></TextField>;
    }
}

export default withStyles(styles)(Input);