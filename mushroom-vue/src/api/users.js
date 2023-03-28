import axios from '../request'

export const allUsersApi = () => axios.get('/api/users/all-user')

export const searchByNameApi = (username) => axios.get('/api/users', {params:{
    username
}
})

export const searchByIdApi = (id) => axios.get('/api/users/' + id)

export const addUserApi = (data) => axios.post('/api/users', {
    username: data.username,
    password: data.password,
    tel: data.tel,
    email: data.email,
    role: data.role
})

export const updateUserApi = (data) => axios.put('/api/users', {
    id: data.id,
    username: data.username,
    password: data.password,
    tel: data.tel,
    email: data.email,
    role: data.role
})

export const deleteById = (id) => axios.delete('/api/users/' + id)

