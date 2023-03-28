import axios from '../request'

export const mushroomInfoByIdApi = (id) => axios.get('/api/mushroomInfo/' + id);
