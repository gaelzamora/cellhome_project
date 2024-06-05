import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { get_product } from "../api/products";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import { Image, Product } from "../Interfaces";
import { useEffect, useState } from "react";
import { useFavoriteStore } from "../store/favorite";
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid"
import ImagesPills from "../components/ImagesPills";

function ProductPage() {
    const [colorSelected, setColorSelected] = useState<number | null>(null)
    const changeStateFavorite = useFavoriteStore(state => state.changeStateFavorite)
    const in_favorite = useFavoriteStore(state => state.inFavorite)
    const [inFavorite, setInFavorite] = useState(false)
    const [currentImage, setCurrentImage] = useState<File | null>(null)

    const handleChangeStateFavorite = (product: Product) => () => {
        setInFavorite(!inFavorite)
        changeStateFavorite(product)
    }

    const { slug } = useParams();

    const { data, isError, isLoading } = useQuery<Product>({
        queryKey: ['product', slug],
        queryFn: () => get_product(slug || ''),
    })

    if(!currentImage) setCurrentImage(data.image)

    const changeColorSelected = (id: any ) => {
        setColorSelected(id)
    }

    const colors = data?.variants?.filter((variant) => variant.variation_category === 'color')
    const capacitys = data?.variants?.filter((variant) => variant.variation_category === 'capacidad')

    if (isError) return toast.error("Error!")
    if (isLoading) return <Loader />


    return (
        <div className="mx-auto md:flex py-5 w-[60%] shadow-lg my-6 relative h-[660px]">
            <div className="flex-1"/>
            <div className="absolute max-w-[500px] -left-14 shadow-lg top-10 rounded-lg bg-white">
                <img src={`${import.meta.env.VITE_BACKEND_URL}${currentImage}`} alt="Image Product" className="relative w-screen bg-cover"/>
                {inFavorite && (
                    <HeartIconSolid onClick={handleChangeStateFavorite(data)} className="w-6 h-6 absolute top-5 right-5" />
                )}
                {!inFavorite && (
                    <HeartIcon onClick={handleChangeStateFavorite(data)} className="w-6 h-6 absolute top-5 right-5"/>
                )} 
                <div className="py-8 px-5 grid grid-cols-[auto, 1fr] flex-grow-0 overflow-auto">
                    <ImagesPills images={data.images} mainImage={data.image} seletectedImage={data.image} setCurrentImage={setCurrentImage}/>
                </div>
            </div>

            <section className="flex-1 -ml-40 my-12 h-[88%] text-red-700 relative ">
                <p className="text-4xl tracking-tighter text-gray-600">{data.name}</p>
                <p className="text-[0.8em] text-gray-400 font-semibold mb-4 mt-4">{data.category}</p>
                <div className="flex tracking-tighter"> 
                    <p className="pt-9 pr-5">MX</p>
                    
                    <p className="text-6xl">
                        {data.price}
                    </p>
                </div>

                <div className="my-6 text-gray-500">
                    <p>Select a color</p>
                    <div className="mt-3 grid grid-cols-8 gap-1 w-1/2">
                        {colors?.map((color) => (
                            <img 
                                src={`${import.meta.env.VITE_BACKEND_URL}${color.image}`} 
                                alt="Variant color" 
                                className={`rounded-full w-10 h-10 cursor-pointer hover:scale-110 transition-all duration-[150ms] delay-[150ms]
                                ${colorSelected === color.id ? 'scale-110 transition-all duration-75 delay-75' : ''}`} 
                                onClick={() => changeColorSelected(color.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="h-44 w-1/2 overflow-y-scroll text-gray-800">
                    {data.description}
                </div>

                <button className="absolute bottom-0 left-0 rounded-md text-gray-100 px-14 py-5 bg-red-600/80 uppercase hover:bg-red-700/80 transition-all duration-75 delay-75">Add to cart</button>
            </section>
        </div>
    )
}

export default ProductPage