import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as authActions from '../../store/actions/actionsIndex';
import classes from './Auth.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                label: 'Email',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                label: 'Password',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            }
        }
    };

    checkValidity(value, validationRules) {
        let isValid = true;
        if (!validationRules) {
            return true;
        }
        if (validationRules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validationRules.minLength) {
            isValid = value.trim().length >= validationRules.minLength && isValid;
        }
        if (validationRules.maxLength) {
            isValid = value.trim().length <= validationRules.maxLength && isValid;
        }
        if (validationRules.isEmail) {
            const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = emailPattern.test(value) && isValid;
        }
        if (validationRules.isNumeric) {
            const numericPattern = /^\d+$/;
            isValid = numericPattern.test(value) && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event, formElementIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [formElementIdentifier]: {
                ...this.state.controls[formElementIdentifier],
                value: event.target.value,
                touched: true,
                valid: this.checkValidity(event.target.value, this.state.controls[formElementIdentifier].validation)
            }
        };
        this.setState({ controls: updatedControls });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthAsyn(this.state.controls.email.value, this.state.controls.password.value);
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                ...this.state.controls[key]
            });
        }

        const form = formElements.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.elementType}
                elementConfig={formElement.elementConfig}
                value={formElement.value}
                label={formElement.label}
                shouldValidate={formElement.validation}
                invalid={!formElement.valid}
                touched={formElement.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthAsyn: (email, password) => {dispatch(authActions.authAsync(email, password))}
    };
};

export default connect(null, mapDispatchToProps)(Auth);