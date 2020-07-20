import { useState, useEffect } from 'react';

export default axiosHttpClient => {
    const [error, setError] = useState(null);

    const requestInterceptors = axiosHttpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    }, err => {
        setError(err);
        return Promise.reject(err);
    });

    const responseInterceptors = axiosHttpClient.interceptors.response.use(response => response,
        err => {
            setError(err);
            return Promise.reject(err);
        });

    useEffect(() => {
        return () => {
            axiosHttpClient.interceptors.request.eject(requestInterceptors);
            axiosHttpClient.interceptors.response.eject(responseInterceptors);
        };
    }, [requestInterceptors, responseInterceptors]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
}
