import axios from '../request'

export const allAreasApi = () => axios.get('/api/areas/all')

export const searchByNameApi = (name) => axios.get('/api/areas', {params:{
    name
}
})

export const searchByIdApi = (id) => axios.get('/api/areas/' + id)

export const addAreaApi = (data) => axios.post('/api/areas', {
    name: data.name,
    coordinate: data.coordinate
})

export const updateAreaApi = (data) => axios.put('/api/areas', {
    id: data.id,
    name: data.name,
    coordinate: data.coordinate
})

export const deleteById = (id) => axios.delete('/api/areas/' + id)

