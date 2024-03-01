export interface Product {
    id?: number
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
    isColor?: boolean
}