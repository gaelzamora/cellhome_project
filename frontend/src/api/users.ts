import { User } from "../Interfaces";
import { authAxios, axi } from "./useAxios";

export const contact_information = async (data: User) => {
    const formData = new FormData();
    formData.append("email", data.email)
    formData.append("phone_number", data.phone_number)
    await authAxios.put(`/users/edit/${data.email}/`, formData)
}

export const shipping_address = async (data: User) => {
    const formData = new FormData()
    formData.append("first_name", data.first_name)
    formData.append("last_name", data.last_name)
    formData.append("address", data.address)
    formData.append("postal_code", data.postal_code)
    formData.append("country", data.country)
    formData.append("suburb", data.suburb)
    formData.append("state_city", data.state_city)
    formData.append("phone_number", data.phone_number)

    console.log(formData)

    await authAxios.put(`/users/edit/${data.email}/`, formData)
}

export const get_user = async (pk: number) => {
    const response = await authAxios.get(`/users/get/${pk}/`)
    return response.data
}


export const search_users = async (query: string) => {
   const response = await authAxios.get(`/users/search/?query=${query}`) 
   return response.data
};

export const delete_user = async (id: number) => {
    await authAxios.delete(`/users/delete/${id}/`) 
};

export const get_users = async () => {
   const response = await authAxios.get("/users/get/") 
   return response.data
};

export const registerRequest = async (email: string, name: string, last_name: string, password: string) => {
    await axi.post("/users/register/", {email, name, last_name, password})
};

export const loginRequest = async (email: string, password: string) => {
    const response = await axi.post("/users/login/", {email, password})
    return response;
};