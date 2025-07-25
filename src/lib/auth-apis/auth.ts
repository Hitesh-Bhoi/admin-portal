import axios from "axios"

interface loginPayload {
    email: String,
    password: String,
    rememberMe?: boolean
}
export const signIn=async(payload: loginPayload)=>{
    return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT}sign-in`, payload, {
        withCredentials: true //important for set cookie from backend
    })
}