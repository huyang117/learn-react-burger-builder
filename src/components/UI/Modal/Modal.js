import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const Modal = props => {
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show ||
    //            nextProps.children !== this.props.children;
    // }

    const modalStyle = {
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
    }

    return (
        <Auxiliary>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={modalStyle}>
                {props.children}
            </div>
        </Auxiliary>
    );
};

export default React.memo(Modal, 
    (prevProps, nextProps) => {
        return nextProps.show === prevProps.show && 
               nextProps.children === prevProps.children
    });