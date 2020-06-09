import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8941b.firebaseio.com/'
});

export default instance;