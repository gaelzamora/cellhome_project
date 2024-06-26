import { Product } from "../Interfaces";
import { axi, authAxios } from "./useAxios";

export const search_products = async (query: string) => {
    const response = await axi.get(`/products/search_products/?query=${query}`)
    return response.data
}


export const get_categorie = async (slug: string ) => {
    const response = await axi.get(`/products/get_categorie/${slug}`)
    return response.data
}

export const get_product_admin = async (id: number) => {
    const response = await axi.get(`/products/get/admin/${id}`)
    return response.data
}

export const get_product = async (slug_url: string) => {
    const response = await axi.get(`/products/get/${slug_url}`)
    return response.data
}

export const get_products = async () => {
    const response = await axi.get(`/products/`)
    return response.data
}


export const edit_product = async (data: Product) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("count_in_stock", data.count_in_stock.toString())
    formData.append("category", data.category)
    formData.append("price", data.price.toString())
    if(data.image){
        formData.append("image", data.image)
    }
    await authAxios.put(
        `/products/edit/${data.id}/`
    )
}

export const post_product = async (data: Product) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("count_in_stock", data.count_in_stock.toString())
    formData.append("category", data.category)
    formData.append("price", data.price.toString())
    if(data.image){
        formData.append("image", data.image)
    }
    await authAxios.post(
        '/products/post/',
        formData
    )

}


export const delete_product = async (id: number) => {
    await authAxios.delete(`/products/delete/${id}/`)
}