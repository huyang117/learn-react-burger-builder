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
                label:'Name'
            },
            street: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                label:'Street'
            },
            zipcode: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                label:'Zipcode'
            },
            country: {
                elementType:'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                label:'Country'
            },
            email: {
                elementType:'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                label:'Email'
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

    orderPlacedHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients, this.props.price);
        this.setState({ orderSubmitLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Alex',
                address: {
                    street: '2 Holland Avenue',
                    zipcode: '271002',
                    country: 'Singapore'
                },
                email: 'burgerbuilder@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ orderSubmitLoading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ orderSubmitLoading: false }));
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.orderForm};
        const updatedElemObj = {...this.state.orderForm[inputIdentifier]};
        updatedElemObj.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedElemObj;
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
            <form>
                {inputElementsOutput}
                <Button
                    btnType='Success'
                    clicked={this.orderPlacedHandler}>PLACE ORDER</Button>
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