import axios from '../request'

export const allMushroomApi = () => axios.get('/api/mushroom/all')

export const allListApi = () => axios.get('/api/mushroom/top10')

export const allPoison = () => axios.get('/api/mushroom/poison')
export const allPoisonList = () => axios.get('/api/mushroom/poison/top10')


export const allMListApi = () => axios.get('/api/mushroom/allMushroom')

export const allColorAndIdApi = () => axios.get('/api/mushroom/allColorAndId')

export const allPoisonColorAndIdApi = () => axios.get('/api/mushroom/poison/allColorAndId')

export const searchByNameApi = (username) => axios.get('/api/mushroom', {params:{
    username
}
})

export const searchByIdApi = (id) => axios.get('/api/mushroom/' + id)

export const addMushroomApi = (data) => axios.post('/api/addMushroom', {
    name: data.name,
    color: data.color,
    photo: data.photo,
    desc: data.desc,
    tagId: data.tagId,
    classifyId: data.classifyId,
    areaId: data.areaId
})

export const updateMushroomApi = (data) => axios.put('/api/mushroom', {
    id: data.id,
    name: data.name,
    color: data.color,
    photo: data.photo,
    desc: data.desc,
    tagId: data.tagId,
    classifyId: data.classifyId,
    areaId: data.areaId
})

export const deleteById = (id) => axios.delete('/api/mushroom/' + id)

export const searchByTagIdApi = (tagId) => axios.get('/api/mushroom/tag/' + tagId)

export const searchPoisonByClassifyIdApi = (id) => axios.get('/api/mushroom/poison/classify/' + id)


export const searchByClassifyIdApi = (id) => axios.get('/api/mushroom/classify/' + id)


export const searchByAreaIdApi = (id) => axios.get('/api/mushroom/area/' + id)

export const searchPoisonByAreaIdApi = (id) => axios.get('/api/mushroom/poison/area/' + id)
