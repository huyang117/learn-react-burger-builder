import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor() {
            super();
            this.requestInterceptors = axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            }, error => {
                this.setState({ error: error });
                return Promise.reject(error);
            });

            this.responseInterceptors = axios.interceptors.response.use(response => response,
                error => {
                this.setState({ error: error });
                return Promise.reject(error);
            });
        }

        state = {
            error: null
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;