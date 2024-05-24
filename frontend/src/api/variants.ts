import { Variant } from "../Interfaces";
import {axi, authAxios} from "./useAxios"

export const post_variant = async (data: Variant) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("variation_category", data.variation_category)
    formData.append("sku", data.sku.toString())
    formData.append("stock", data.stock.toString())
    formData.append("id_product", data.id_product.toString())

    if(data.image) {
        formData.append("image", data.image)
    }

    await authAxios.post(`/products/post/variation/`, formData)
}

export const delete_variation = async (pk: number) => {
    await authAxios.delete(`/products/delete_variant/${pk}/`)
}   