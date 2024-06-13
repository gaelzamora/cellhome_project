import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { get_product } from "../api/products";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import {  Product } from "../Interfaces";
import { useEffect, useState } from "react";
import { useFavoriteStore } from "../store/favorite";
import { useCartStore } from "../store/cart";
import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid"
import ImagesPills from "../components/ImagesPills";
import { useAuthStore } from "../store/auth";
import withScrollToTop from "../layouts/withScrollToTop";
import CartModal from "../components/CartModal";

function ProductPage() {
    const [colorSelected, setColorSelected] = useState<number | null>(null)
    const [showCart, setShowCart] = useState(false)
    const changeStateFavorite = useFavoriteStore(state => state.changeStateFavorite)
    const in_favorite = useFavoriteStore(state => state.inFavorite)
    const [inFavorite, setInFavorite] = useState(false)
    const [currentImage, setCurrentImage] = useState<File | null>(null)
    const add_cart = useCartStore(state => state.addToCart)
    const {isAuth} = useAuthStore()
    const navigate = useNavigate()

    const { slug } = useParams();

    const { data, isError, isLoading } = useQuery<Product>({
        queryKey: ['product', slug],
        queryFn: () => get_product(slug || ''),
    })

    const handleChangeStateFavorite = (product: Product) => () => {
        setInFavorite(!inFavorite)
        changeStateFavorite(product)
    }
    
    const changeColorSelected = (id: any ) => {
        setColorSelected(id)
        if(colorSelected === id) setColorSelected(null)

            
    }
    
    const colors = data?.variants?.filter((variant) => variant.variation_category === 'color')
    const capacitys = data?.variants?.filter((variant) => variant.variation_category === 'capacidad')

    const handleAddCart = (product: Product) => {
        if(isAuth) {
            if(colorSelected === null) toast.error("You have to select a color!") 
            add_cart(product)
            toast.success("The item has been added to your cart", { style: {
                    padding: '16px',
                  },
                  iconTheme: {
                    primary: '#3cdb34',
                    secondary: '#ffffff',
                  },
            })
            setShowCart(true)
            return
        }
        navigate('/accounts/login')
    }

    console.log(colors)

    useEffect(() => {
        if(data!==undefined) setInFavorite(in_favorite(data))
        if(currentImage === null && data !== undefined) setCurrentImage(data.image)
    }, [currentImage, data])

    if (isError) return toast.error("Error!")
    if (isLoading) return <Loader />

    return (
        <div className="relative">
            <div className="mx-auto md:flex py-5 w-[60%] shadow-lg my-6 relative md:h-[660px]">
                <div className="flex-1"/>
                <div className="md:absolute max-w-[500px] md:-left-14 shadow-lg md:top-10 rounded-lg bg-white">
                    {isLoading && (
                        <div className="relative w-screen">
                            <Loader />
                        </div>
                    )}
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${currentImage}`} alt="Image Product" className="relative w-screen bg-cover"/>
                    {inFavorite && (
                        <HeartIconSolid onClick={handleChangeStateFavorite(data)} className="w-6 h-6 absolute top-5 right-5" />
                    )}
                    {!inFavorite && (
                        <HeartIcon onClick={handleChangeStateFavorite(data)} className="w-6 h-6 absolute top-5 right-5"/>
                    )} 
                    <div className="py-8 px-5 grid grid-cols-[auto, 1fr] flex-grow-0 overflow-auto">
                        <ImagesPills 
                            images={data.images} 
                            mainImage={data.image} 
                            currentImage={currentImage}
                            setCurrentImage={setCurrentImage}
                        />
                    </div>
                </div>

                <section className="flex-1 md:my-12 h-full md:py-0 py-3 md:h-[88%] text-gray-800 relative md:ml-0 md:text-start text-center">
                    <p className="text-4xl tracking-tighter text-gray-600 overflow-auto overflow-y-hidden">{data.name}</p>
                    <p className="text-[0.8em] text-gray-400 font-semibold mb-4 mt-4">{data.category}</p>
                    <div className="flex tracking-tighter md:px-0 px-4"> 
                        <p className="pt-9 pr-5">MX</p>
                        
                        <p className="text-6xl">    
                            {data.price}
                        </p>
                    </div>

                    <div className="my-6 text-gray-500">
                        <p>Select a color</p>
                        <div className="mt-3 grid grid-cols-8 gap-1 w-full md:gap-0 md:px-0 px-3">
                            {colors?.map((color) => (
                                <img 
                                    src={`${import.meta.env.VITE_BACKEND_URL}${color.image}`} 
                                    alt="Variant color" 
                                    className={`rounded-full w-10 h-10 cursor-pointer hover:opacity-50 transition-all hover: duration-[150ms]
                                    ${colorSelected === color.id ? 'transition-all duration-75 opacity-50' : ''}`} 
                                    onClick={() => changeColorSelected(color.id)}
                                />
                            ))}
                        </div>

                        <p>Select capacity</p>
                        <div className="mt-3 grid grid-cols-8 gap-1 w-full md:gap-0 md:px-0 px-3">
                            {capacitys?.map((capacity) => (
                                <p className="bg-gray-500/60 rounded-md border-2 shadow-md text-white text-center px-1">
                                    {capacity.name}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="md:h-44 md:w-1/2 my-4 overflow-y-scroll text-gray-800 md:text-start text-center">
                            {data.description}
                    </div>

                    <button 
                        className="md:absolute bottom-0 left-0 rounded-md text-gray-100 px-14 py-5 bg-blue-700/80 uppercase hover:bg-blue-800/80 transition-all duration-75 delay-75"
                        onClick={() => handleAddCart(data)}    
                    >Add to cart</button>   
                </section>

            </div>
            <CartModal setOpen={setShowCart} isOpen={showCart} />
        </div>
    )
}

export default withScrollToTop(ProductPage)