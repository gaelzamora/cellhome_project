import {Product} from '../Interfaces'
import { HiOutlineHeart } from 'react-icons/hi'

interface Props {
    product: Product
}

function ProductCard({product}: Props) {
    return (
        <div className='inline-flex gap-4'>
            <div className='w-64 bg-red-400 max-h-96 inline-block'>
                <div className='relative'>
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} alt="" className='w-screen'
                    /> 
                    <HiOutlineHeart className='w-6 h-6 absolute' />
                </div>
                <div className='text-left px-4'>
                    <p>{product.name}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard