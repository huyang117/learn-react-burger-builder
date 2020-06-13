import React, { Component } from 'react';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                label:'Name',
                validation: {
                    required: true
                }, 
                valid: false
            },
            street: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                label:'Street',
                validation: {
                    required: true
                }, 
                valid: false
            },
            zipcode: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                label:'Zipcode',
                validation: {
                    required: true,
                    minLength:6,
                    maxLength:6
                }, 
                valid: false
            },
            country: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                label:'Country',
                validation: {
                    required: true
                }, 
                valid: false
            },
            email: {
                elementType:'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                label:'Email',
                validation: {
                    required: true
                }, 
                valid: false
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig: {
                    options:[{value:'cheapest',displayValue:'Cheapest'},
                             {value:'fastest',displayValue:'Fastest'}]
                },
                value:'',
                label:'Delivery Method'
            }
        },
        orderSubmitLoading: false
    }

    checkValidity(value, validationRules) {
        let isValid = true;
        if (validationRules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (validationRules.minLength) {
            isValid = value.trim().length >= validationRules.minLength && isValid;
        }
        if (validationRules.maxLength) {
            isValid = value.trim().length <= validationRules.maxLength && isValid;
        }
        return isValid;
    }

    orderPlacedHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients, this.props.price);
        this.setState({ orderSubmitLoading: true });
        const orderData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            orderData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            ...orderData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ orderSubmitLoading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ orderSubmitLoading: false }));
    }

    inputChangedHandler = (event, formElementIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedElemObj = {...this.state.orderForm[formElementIdentifier]};
        updatedElemObj.value = event.target.value;
        updatedElemObj.valid = this.checkValidity(updatedElemObj.value,updatedElemObj.validation);
        updatedOrderForm[formElementIdentifier] = updatedElemObj;
        console.log(updatedElemObj);
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
        const formElements=[];
        for (let key in this.state.orderForm) {
            formElements.push({
                key:key,
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
                        changed={(event) => this.inputChangedHandler(event,formElement.key)} />
        });

        let contactDataForm = (
            <form onSubmit={this.orderPlacedHandler}>
                {inputElementsOutput}
                <Button btnType='Success'>PLACE ORDER</Button>
            </form>
        );
        if (this.state.orderSubmitLoading === true) {
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

export default ContactData;