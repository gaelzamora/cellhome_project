import { Product } from "../Interfaces"
import { Link } from "react-router-dom"
import { useFavoriteStore } from "../store/favorite"
import { useEffect, useState } from "react"
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid"

type props = {
    product: Product
    category: string
}

function CardProduct(props : props) {
    const changeStateFavorite = useFavoriteStore(state => state.changeStateFavorite)
    const in_favorite = useFavoriteStore(state => state.inFavorite)
    const [inFavorite, setInFavorite] = useState(false)

    const handleChangeStateFavorite = (product: Product) => () => {
        setInFavorite(!inFavorite)
        changeStateFavorite(product)
    }

    const {product, category} = props

    useEffect(() => {
        const state = in_favorite(product)
        setInFavorite(state)
    }, [])
    
    return (
        <Link to={`/store/${category}/${product.slug_url}`} className="cursor-pointer max-w-sm bg-white shadow-lg rounded-[1.5rem] flex flex-col p-8 h-[450px] hover:scale-[1.01] hover:shadow-lg transition-all 
        duration-[400ms]">  
            <div className="h-20 max-h-20">
                <p className="text-[1.6rem] text-gray-600 tracking-tighter font-bold">{product.name}</p>
            </div>
            <div className="relative">
                <img src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} alt="Imagen de Producto"  className="w-[40em]"/>
                {inFavorite && (
                    <HeartIconSolid onClick={handleChangeStateFavorite(product)} className="w-6 h-6 absolute right-0 bottom-0" />
                )}
                {!inFavorite && (
                    <HeartIcon onClick={handleChangeStateFavorite(product)} className="w-6 h-6 absolute right-0 bottom-0"/>
                )}
            </div>
            <div className="mt-10 gap-2 flex relative">
                <p className="text-[0.9rem] text-gray-700 max-w-[75%] font-semibold">{product.description}</p>
                <Link to={'/'} className="absolute bg-blue-600 py-1 top-0 text-center px-[12px] right-0 text-white rounded-full">Buy</Link>
            </div>
        </Link>
        
    )
}

export default CardProduct  
