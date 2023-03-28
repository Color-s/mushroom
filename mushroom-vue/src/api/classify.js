import axios from '../request'

export const allClassifyApi = () => axios.get('/api/classify/all-classify')

export const searchByNameApi = (name) => axios.get('/api/classify', {params:{
    name
}
})

export const searchByIdApi = (id) => axios.get('/api/classify/' + id)

export const addClassifyApi = (data) => axios.post('/api/classify', {
    name: data.name,
    color: data.color,
    desc: data.desc
})

export const updateClassifyApi = (data) => axios.put('/api/classify', {
    id: data.id,
    name: data.name,
    color: data.color,
    desc: data.desc
})

export const deleteById = (id) => axios.delete('/api/classify/' + id)

