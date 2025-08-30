import axios from "axios"

interface authPayload {
    email: string,
    password: string,
    rememberMe?: boolean,
    fullname?: string,
}

const endpoint = process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT;

export const signUp = async (payload: authPayload) => {
    return axios.post(`${endpoint}sign-up`, payload);
}

export const signIn = async (payload: authPayload) => {
    return await axios.post(`${endpoint}sign-in`, payload, {
        withCredentials: true //important for set cookie from backend
    })
}

export const verifyUser = async () => {
    return await axios.get(`${endpoint}verify-me`, { withCredentials: true });
}

export const signOutUser = async () => {
    return await axios.post(`${endpoint}sign-out`, {}, { withCredentials: true })
}

export const forgotPassowrd = async(email: string) =>{
    return await axios.post(`${endpoint}forgot-password/${email}`);
}

export const resetPassword =async(payload: any) =>{
    return await axios.put(`${endpoint}reset-password`, payload)
}