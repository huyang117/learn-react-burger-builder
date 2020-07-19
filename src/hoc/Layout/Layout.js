import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerOpened, setSideDrawerOpened] = useState(false);

    const closeSideDrawerHandler = () => {
        setSideDrawerOpened(false);
    }

    const toggleSideDrawerHandler = () => {
        setSideDrawerOpened(!sideDrawerOpened);
    }

    return (
        <Auxiliary>
            <Toolbar
                isAuthenticated={props.isAuthenticated}
                toggleSideDrawerTriggered={toggleSideDrawerHandler} />
            <SideDrawer
                isAuthenticated={props.isAuthenticated}
                show={sideDrawerOpened}
                closed={closeSideDrawerHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);