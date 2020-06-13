import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case 'input':
            inputElement = <input {...props.elementConfig} className={classes.InputElement} value={props.value} />;
            break;
        case 'textarea':
            inputElement = <textarea {...props.elementConfig} className={classes.InputElement} value={props.value} />;
            break;
        case 'select':
            const optionList = props.elementConfig.options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.displayValue}
                </option>
            ));
            inputElement = (
                <select className={classes.InputElement} value={props.value}>
                    {optionList}
                </select>);
            break;
        default:
            inputElement = <input {...props.elementConfig} className={classes.InputElement} value={props.value} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;