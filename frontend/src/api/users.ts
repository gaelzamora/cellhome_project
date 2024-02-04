import {axi} from './useAxios'

export const registerRequest = async (email: string, first_name: string, last_name: string, password: string) => {
    await axi.post("/users/register/", {
        email,
        first_name,
        last_name,
        password
    })
}


export const loginRequest = async (email: string, password: string) => {
    const response = await axi.post("/users/login/", {
        email, 
        password
    })
    return response
}