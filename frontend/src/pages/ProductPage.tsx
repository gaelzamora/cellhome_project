import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { get_product } from "../api/products";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import { Product } from "../Interfaces";
import { useState } from "react";

function ProductPage() {
    const [count, setCount] = useState(1)

    const { slug } = useParams();

    const { data, isError, isLoading } = useQuery<Product>({
        queryKey: ['product', slug],
        queryFn: () => get_product(slug || ''),
    })

    const handleIncrementCount = () => {
        setCount(count+1)
    }

    const handleDecrementCount = () => {
        if(count > 1) {
            setCount(count-1)
        }
    }


    if (isError) return toast.error("Error!")
    if (isLoading) return <Loader />
        
    return (
        <div className="max-w-[80%] mx-auto md:flex px-5 py-5">
            <section className="max-w-[500px] bg-white px-3 py-10">
                <img src={`${import.meta.env.VITE_BACKEND_URL}${data.image}`} alt="" />
            </section>

            <section className="px-10">
                <p className="text-[1.3em] uppercase tracking-tighter text-gray-600">{data.name}</p>
                <p className="text-[0.8em] text-gray-700 font-semibold mb-4">{data.category}</p>
                <p className="tracking-wider text-blue-500 font-semibold">
                    ${data.price}
                </p>

                <div className="flex">
                    <div className="rounded-l-xl  mt-5 flex bg-gray-200/80 items-center justify-center w-32">
                        <button onClick={handleDecrementCount} className="px-5 py-1">
                            -
                        </button>
                        <p className="px-5 py-1">   {count}</p>
                        
                        <button onClick={handleIncrementCount} className="px-5 py-1">
                            +
                        </button>
                    </div>

                    <div className="mt-5">
                        <button className="rounded-r-xl text-gray-100 px-14 py-1 bg-blue-600/80">Add to cart</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductPage