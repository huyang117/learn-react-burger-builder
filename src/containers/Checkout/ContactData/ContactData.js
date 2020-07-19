import React, { useState } from 'react';
import classes from './ContactData.css';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/actionsIndex';
import { updateStateUtil, checkValidity } from '../../../shared/utility';

import axios from '../../../axios-orders';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState(
        {
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
        });

    const [elementsAllValid, setElementsAllValid] = useState(false);

    const orderPlacedHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        for (let formElementIdentifier in orderForm) {
            orderData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: Number.parseFloat(props.price).toFixed(2),
            ...orderData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event, formElementIdentifier) => {
        const updatedElemObj = updateStateUtil(orderForm[formElementIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value,
                orderForm[formElementIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateStateUtil(orderForm, {
            [formElementIdentifier]: updatedElemObj
        });

        let isOverallValid = true;
        for (let key in updatedOrderForm) {
            isOverallValid = updatedOrderForm[key].valid && isOverallValid;
        }

        setOrderForm(updatedOrderForm);
        setElementsAllValid(isOverallValid);
    }

    const formElements = [];
    for (let key in orderForm) {
        formElements.push({
            key: key,
            ...orderForm[key]
        });
    }
    const inputElementsOutput = formElements.map(formElement => {
        return <Input
            key={formElement.key}
            elementType={formElement.elementType}
            elementConfig={formElement.elementConfig}
            value={formElement.value}
            label={formElement.label}
            changed={(event) => inputChangedHandler(event, formElement.key)}
            shouldValidate={formElement.validation}
            invalid={!formElement.valid}
            touched={formElement.touched} />
    });

    let contactDataForm = (
        <form onSubmit={orderPlacedHandler}>
            {inputElementsOutput}
            <Button
                btnType='Success'
                disabled={!elementsAllValid}>
                PLACE ORDER</Button>
        </form>
    );
    if (props.orderSubmitLoading === true) {
        contactDataForm = <Spinner />;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Please Enter Your Contact Information</h4>
            {contactDataForm}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        orderSubmitLoading: state.order.orderSubmitLoading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurgerAsync(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));