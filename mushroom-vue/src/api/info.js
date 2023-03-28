import axios from '../request'

export const allInfoApi = () => axios.get('/api/info/all')

export const infoTop = () => axios.get('/api/info/top')

export const searchByTitleApi = (title) => axios.get('/api/info', {params:{
    title
}
})

export const searchByIdApi = (id) => axios.get('/api/info/' + id)

export const addInfoApi = (data) => axios.post('/api/info', {
    title: data.title,
    msg: data.msg,
    userId: data.userId,
    photo: data.photo,
    weight: data.weight
})

export const updateInfoApi = (data) => axios.put('/api/info', {
    id: data.id,
    title: data.title,
    msg: data.msg,
    userId: data.userId,
    photo: data.photo,
    weight: data.weight
})

export const deleteById = (id) => axios.delete('/api/info/' + id)

