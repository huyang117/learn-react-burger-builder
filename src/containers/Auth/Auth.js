import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authActions from '../../store/actions/actionsIndex';
import { updateStateUtil, checkValidity } from '../../shared/utility';

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
        },
        signUpMode: true
    };

    componentDidMount() {
        if ( !this.props.buildingBurger && this.props.authRedirectPath!=='/') {
            this.props.onSetAuthRedirectPath('/');
        }
    }

    switchSignInSignUp = () => {
        this.setState((prevState) => {
            return { signUpMode: !prevState.signUpMode };
        });
    };

    inputChangedHandler = (event, formElementIdentifier) => {
        const updatedElement = updateStateUtil(this.state.controls[formElementIdentifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.controls[formElementIdentifier].validation)
        });
        const updatedControls = updateStateUtil(this.state.controls, {
            [formElementIdentifier]: updatedElement
        });
        this.setState({ controls: updatedControls });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthAsyn(this.state.controls.email.value, this.state.controls.password.value, this.state.signUpMode);
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                ...this.state.controls[key]
            });
        }

        let form = formElements.map(formElement => (
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

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p className={classes.ErrorMessage}>{this.props.error}</p>;
        }

        let redirectUponLogin = null;
        if (this.props.isAuthenticated) {
            redirectUponLogin = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {redirectUponLogin}
                <h1>{this.state.signUpMode ? 'SIGN-UP NOW' : 'SIGN-IN NOW'}</h1>
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button
                    btnType='Danger'
                    clicked={this.switchSignInSignUp}>
                    Switch to {this.state.signUpMode ? 'SIGN-IN' : 'SIGN-UP'}
                </Button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthAsyn: (email, password, signUpMode) => { dispatch(authActions.authAsync(email, password, signUpMode)) },
        onSetAuthRedirectPath: (path) => dispatch(authActions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);