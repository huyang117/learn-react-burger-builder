import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    const switchItem = props.isAuthenticated ? 
        <NavigationItem link="/logout">Log out</NavigationItem> :
        <NavigationItem link="/auth">Login</NavigationItem>;
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            {switchItem}
        </ul>
    );
};

export default NavigationItems;