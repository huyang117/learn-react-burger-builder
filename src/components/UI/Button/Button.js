import React from 'react';
import classes from './Button.css';

const Button = (props) => {
    const btnClass = [classes.Button, classes[props.btnType]].join(' ');
    return (
        <button 
            className={btnClass} 
            onClick={props.clicked}
            disabled={props.disabled}>{props.children}</button>
    );
}

export default Button;