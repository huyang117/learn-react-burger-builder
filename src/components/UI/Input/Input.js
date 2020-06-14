import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    let validationMsg = null;
    const inputClasses=[classes.InputElement];
    if (props.shouldValidate && props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
        validationMsg=<p className={classes.ValidationError}>
                            {props.label} entered is not valid</p>;
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'textarea':
            inputElement = <textarea
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'select':
            const optionList = props.elementConfig.options.map(
                option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ));
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {optionList}
                </select>);
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed} />;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationMsg}
        </div>
    );
}

export default Input;