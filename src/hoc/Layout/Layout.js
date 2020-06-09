import React, { Component } from 'react';
import classes from './Layout.css';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerOpened: false
    }

    closeSideDrawerHandler = () => {
        this.setState({ sideDrawerOpened: false })
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState, props) => {
            return { sideDrawerOpened: !prevState.sideDrawerOpened };
        });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar toggleSideDrawerTriggered={this.toggleSideDrawerHandler} />
                <SideDrawer 
                    show={this.state.sideDrawerOpened}
                    closed={this.closeSideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;