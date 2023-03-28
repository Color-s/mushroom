import axios from "axios";


const service = axios.create({
    // baseURL: "http://mushroom-api.fenghua0918.top/",
    baseURL: "http://localhost:3000/",
    timeout: 6000
})

export default service