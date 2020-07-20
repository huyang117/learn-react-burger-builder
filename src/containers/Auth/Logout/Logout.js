import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/actionsIndex';

const Logout = props => {
    useEffect(() => {
        props.onLogout();
    }, []);
    
    return (<Redirect to='/' />);
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);