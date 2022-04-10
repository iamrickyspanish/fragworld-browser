import axios from "axios"

const myAxios = axios.create({
    baseURL: process.env.REACT_APP_PROXY
})

export default myAxios