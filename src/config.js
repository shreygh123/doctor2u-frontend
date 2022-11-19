import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://doctor2u.herokuapp.com/"
})