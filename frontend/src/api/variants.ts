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

    console.log(formData)

    await authAxios.post(`/products/post/variation/`, formData)
}
export const get_variations = async ({pageParam = 1}) => {
    const response = await axi.get(`/products/variations/?page=${pageParam}&pages=9`)
    return response.data
}

// azul
// 128 gb
// 10

// Select an option
// -- iPhone 13 0
// -- iPAd mini 1
// -- Airpods 2