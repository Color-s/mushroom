import axios from '../request'

export const allTagsApi = () => axios.get('/api/tags/all-tags')

export const searchByNameApi = (name) => axios.get('/api/tags', {params:{
    name
}
})

export const searchByIdApi = (id) => axios.get('/api/tags/' + id)

export const addTagApi = (data) => axios.post('/api/tags', {
    name: data.name,
    color: data.color,
    desc: data.desc
})

export const updateTagApi = (data) => axios.put('/api/tags', {
    id: data.id,
    name: data.name,
    color: data.color,
    desc: data.desc
})

export const deleteById = (id) => axios.delete('/api/tags/' + id)

