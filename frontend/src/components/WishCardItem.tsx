import { Link } from "react-router-dom"
import { Product } from "../Interfaces"

type Props = {
    product: Product
}

function WishCardItem(props: Props) {
    
    const {product} = props

    return (
        <div className="flex flex-col max-w-[400px] w-[400px] h-[350px] max-h-[350px]">
            <div className="bg-[#fff] rounded-lg flex items-center justify-center">
                <img src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} alt="Imagen de Producto en Favorito" className="rounded-lg px-10 py-3" width={300}/>
            </div>

            <div className="py-3 tracking-tighter">
                <p className="text-[1.3em] font-semibold py-1">All saved by you</p>

                <p className="text-[15px] py-1">1 item</p>

                <Link to={'/'} className="text-[1.1em] py-1 text-blue-600 font-semibold">See details &#62; </Link>
            </div>
        </div>
    )
}

export default WishCardItem