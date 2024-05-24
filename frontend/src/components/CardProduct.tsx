import { Product, Variant } from "../Interfaces"
import { Link } from "react-router-dom"

type props = {
    product: Product
    category: string
}

function CardProduct(props : props) {
    

    const {product, category} = props


    return (
        <Link to={`/store/${category}/${product.slug_url}`} className="cursor-pointer max-w-sm bg-white shadow-lg rounded-[1.5rem] flex flex-col p-8 h-[450px] hover:scale-[1.01]
        hover:shadow-lg transition-all duration-[400ms]">  
            <div className="h-20 max-h-10 overflow-y-auto overscroll-auto">
                <p className="text-[1.6rem] text-gray-600 tracking-tighter font-bold">{product.name}</p>
            </div>
            <div className="relative flex">
                <img src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} alt="Imagen de Producto"  className="w-[40em]"/>
                <div className="absolute h-full w-10 right-0 top-0 pt-2 pb-2">
                    {product.variants?.map((variant: Variant) => (
                        <img src={`${import.meta.env.VITE_BACKEND_URL}${variant.image}`} alt="Image" className="w-8 h-8 rounded-[100%] justify-center items-center" />
                    ))}
                    
                </div>
            </div>
            <div className="mt-10 gap-2 flex relative">
                <p className="text-[0.9rem] text-gray-700 max-w-[75%] font-semibold">{product.description}</p>
                <Link to={'/'} className="absolute bg-blue-600 py-1 top-0 text-center px-[12px] right-0 text-white rounded-full">Buy</Link>
            </div>
        </Link>
        
    )
}

export default CardProduct  
