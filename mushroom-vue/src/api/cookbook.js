import axios from '../request'

export const allCookbookApi = () => axios.get('/api/cookbook/all')

export const searchByNameApi = (name) => axios.get('/api/cookbook', {params:{
    name
}
})

export const searchByIdApi = (id) => axios.get('/api/cookbook/' + id)

export const searchByTypeApi = (tName) => axios.get('/api/cookbook/type/' + tName)

export const addCookbookApi = (data) => axios.post('/api/cookbook', {
    
    name: data.name,
    type: data.type,
    desc: data.desc,
    mushroomId: data.mushroomId
})

export const updateCookbookApi = (data) => axios.put('/api/cookbook', {
    id: data.id,
    name: data.name,
    type: data.type,
    desc: data.desc,
    mushroomId: data.mushroomId
})

export const deleteById = (id) => axios.delete('/api/cookbook/' + id)

