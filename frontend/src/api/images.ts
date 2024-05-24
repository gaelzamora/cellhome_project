import { Image } from "../Interfaces"
import { authAxios } from "./useAxios"

export const post_image = async (data: Image) => {
    const formData = new FormData()
    formData.append("id_product", data.id_product.toString())

    if(data.image) {
        formData.append("image", data.image)
    }

    await authAxios.post('/products/post/image/', formData)
}

export const delete_image = async (pk: number) => {
    await authAxios.delete(`/products/delete_image/${pk}/`)
}