import React, { useState, useEffect } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const requestInterceptors = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        }, err => {
            setError(err);
            return Promise.reject(err);
        });

        const responseInterceptors = axios.interceptors.response.use(response => response,
            err => {
                setError(err);
                return Promise.reject(err);
            });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptors);
                axios.interceptors.response.eject(responseInterceptors);
            };
        }, [requestInterceptors, responseInterceptors]);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        return (
            <Auxiliary>
                <Modal
                    show={error}
                    modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        );

    }
}

export default withErrorHandler;