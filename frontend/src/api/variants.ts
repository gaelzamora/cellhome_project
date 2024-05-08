import { Variant } from "../Interfaces";
import {axi, authAxios} from "./useAxios"

export const post_variant = async (data: Variant, pk: number) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("variant_category", data.variant_category)
    formData.append("sku", data.sku)
    formData.append("stock", data.stock.toString())

    if(data.image) {
        formData.append("image", data.image)
    }

    await authAxios.post(`/products/post/variation/${pk}/`, formData)
}

export const get_variations = async () => {
    const response = await axi.get('/products/variations/')
    return response.data
}

// azul
// 128 gb
// 10

// Select an option
// -- iPhone 13 0
// -- iPAd mini 1
// -- Airpods 2