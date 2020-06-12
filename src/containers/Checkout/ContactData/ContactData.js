import React, { Component } from 'react';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        address: {
            street: '',
            zipcode: '',
            country: ''
        },
        email: '',
        deliveryMethod: '',
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

    render() {
        let contactDataForm = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="zipcode" placeholder="Zipcode" />
                <input className={classes.Input} type="text" name="country" placeholder="Country" />
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