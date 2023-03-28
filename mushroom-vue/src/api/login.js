import axios from '../request';

export const loginApi = (username, password) => axios.post('/api/users/login', {
    username,
    password
})