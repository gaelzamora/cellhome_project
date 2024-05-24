export interface Product {
    id: number
    name: string
    slug: string
    description: string
    price: number
    rating?: number
    count_in_stock: number
    category: string
    image: File | null
    quantity?: number
    num_reviews?: number
    slug_url: string
    variants?: Variant[]
    images: Image[]
    num_images: number
}

export interface Token {
    exp: number
    is_staff: boolean
    first_name: string
    last_name: string
    avatar: string
}

export interface Item {
    product: string
    title: string
    description: string
    img: string
    isWhite: boolean
}


export interface Variant {
    id: number
    name: string
    id_product: number
    variation_category: string
    sku: number
    stock: number
    image: File | null
}
export interface Image {
    id: number
    id_product: number 
    image: File | null
}