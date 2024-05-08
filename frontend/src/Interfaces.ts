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
    name: string
    variant_category: string
    sku: string
    stock: number
    image: File | null
}
