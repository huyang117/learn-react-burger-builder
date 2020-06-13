import React, { Component } from 'react';
import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
                <Input inputtype="input" type="text" label="name" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="email" label="email" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" label="street" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" label="zipcode" name="zipcode" placeholder="Zipcode" />
                <Input inputtype="input" type="text" label="country" name="country" placeholder="Country" />
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