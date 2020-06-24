import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    const loginLogout = props.isAuthenticated ? 
        <NavigationItem link="/logout">Log out</NavigationItem> :
        <NavigationItem link="/auth">Login</NavigationItem>;
    const historyOrders = props.isAuthenticated? 
        <NavigationItem link="/orders">Orders</NavigationItem> : null;
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {historyOrders}
            {loginLogout}
        </ul>
    );
};

export default NavigationItems;