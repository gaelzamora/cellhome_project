import { Product } from "../Interfaces"

type props = {
    product: Product
}

function CardProduct(props : props) {
    const {product} = props

    console.log(product)
    return (
        <div className="relative cursor-pointer">  
            <img src={product.image} alt="" />
        </div>
    )
}

export default CardProduct
