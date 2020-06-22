import React, { Component } from 'react';
import classes from './ContactData.css';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/actionsIndex';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                label: 'Name',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                label: 'Street',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                label: 'Zipcode',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                label: 'Country',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
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
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'cheapest', displayValue: 'Cheapest' },
                    { value: 'fastest', displayValue: 'Fastest' }]
                },
                value: 'cheapest',
                label: 'Delivery Method',
                validation: {},
                valid: true
            }
        },
        elementsAllValid: false,
    }

    checkValidity(value, validationRules) {
        let isValid = true;
        if (!validationRules) { // if no validation rules, return true
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
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }
        if (validationRules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }
        return isValid;
    }

    orderPlacedHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            orderData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: Number.parseFloat(this.props.price).toFixed(2),
            ...orderData
        }
        this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event, formElementIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedElemObj = { ...this.state.orderForm[formElementIdentifier] };
        updatedElemObj.value = event.target.value;
        updatedElemObj.valid =
            this.checkValidity(updatedElemObj.value, updatedElemObj.validation);
        updatedElemObj.touched = true;
        updatedOrderForm[formElementIdentifier] = updatedElemObj;
        console.log(updatedElemObj);
        //this.setState({ orderForm: updatedOrderForm });

        let isOverallValid = true;
        for (let key in updatedOrderForm) {
            isOverallValid = updatedOrderForm[key].valid && isOverallValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            elementsAllValid: isOverallValid
        });
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                key: key,
                ...this.state.orderForm[key]
            });
        }
        const inputElementsOutput = formElements.map(formElement => {
            return <Input
                key={formElement.key}
                elementType={formElement.elementType}
                elementConfig={formElement.elementConfig}
                value={formElement.value}
                label={formElement.label}
                changed={(event) => this.inputChangedHandler(event, formElement.key)}
                shouldValidate={formElement.validation}
                invalid={!formElement.valid}
                touched={formElement.touched} />
        });

        let contactDataForm = (
            <form onSubmit={this.orderPlacedHandler}>
                {inputElementsOutput}
                <Button
                    btnType='Success'
                    disabled={!this.state.elementsAllValid}>
                    PLACE ORDER</Button>
            </form>
        );
        if (this.props.orderSubmitLoading === true) {
            contactDataForm = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please Enter Your Contact Information</h4>
                {contactDataForm}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        orderSubmitLoading: state.order.orderSubmitLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurgerAsync(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));