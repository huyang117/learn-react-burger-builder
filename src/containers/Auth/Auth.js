import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as authActions from '../../store/actions/actionsIndex';
import { updateStateUtil, checkValidity } from '../../shared/utility';

import classes from './Auth.css';

const Auth = props => {
    const [controls, setControls] = useState(
        {
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
    );

    const [signUpMode, setSignUpMode] = useState(true);

    const {buildingBurger,authRedirectPath,onSetAuthRedirectPath}=props;
    useEffect(() => {
        if ( !buildingBurger && authRedirectPath!=='/') {
            onSetAuthRedirectPath('/');
        }
    }, [buildingBurger,authRedirectPath,onSetAuthRedirectPath]);

    const switchSignInSignUp = () => {
        setSignUpMode(!signUpMode);
    };

    const inputChangedHandler = (event, formElementIdentifier) => {
        const updatedElement = updateStateUtil(controls[formElementIdentifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, controls[formElementIdentifier].validation)
        });
        const updatedControls = updateStateUtil(controls, {
            [formElementIdentifier]: updatedElement
        });
        setControls(updatedControls);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        props.onAuthAsyn(controls.email.value, controls.password.value, signUpMode);
    }

        const formElements = [];
        for (let key in controls) {
            formElements.push({
                id: key,
                ...controls[key]
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
                changed={(event) => inputChangedHandler(event, formElement.id)} />
        ));

        if (props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (props.error) {
            errorMessage = <p className={classes.ErrorMessage}>{props.error}</p>;
        }

        let redirectUponLogin = null;
        if (props.isAuthenticated) {
            redirectUponLogin = <Redirect to={props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {redirectUponLogin}
                <h1>{signUpMode ? 'SIGN-UP NOW' : 'SIGN-IN NOW'}</h1>
                {errorMessage}
                <form onSubmit={onSubmitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button>
                </form>
                <Button
                    btnType='Danger'
                    clicked={switchSignInSignUp}>
                    Switch to {signUpMode ? 'SIGN-IN' : 'SIGN-UP'}
                </Button>
            </div>
        );
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