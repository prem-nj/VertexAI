import { api } from "../utils/axios"

export const login = async () => {
  try {
    const { data } = await api.get("/api/auth/login")
    return data;
    
  } catch (error){
    console.log(error)
    return null
  }
}