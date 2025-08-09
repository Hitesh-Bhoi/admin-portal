import axios from "axios"
const endpoint = process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT;
export const getAllUsers =async()=> {
    return axios.get(`${endpoint}users`)
}