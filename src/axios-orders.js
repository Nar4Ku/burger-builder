import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-c910b.firebaseio.com/'
});

export default instance;