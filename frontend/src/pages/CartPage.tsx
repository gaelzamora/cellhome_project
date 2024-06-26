import { Link, useNavigate } from "react-router-dom"
import CellHomeLogo from '../assets/cellhome.png'
import { useCartStore } from "../store/cart"
import { Product } from "../Interfaces"
import { useEffect, useState } from "react"
import {motion, AnimatePresence} from 'framer-motion'
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { OrderInformation } from "../Interfaces"
import AddressComponent from "../components/Address"
import withScrollToTop from "../layouts/withScrollToTop"

const itemVariants = {
    hidden: {
        y: '-100%',
        transition: {
            duration: 0.5
        }
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

function CartPage() {
    const [showAddress, setShowAddress] = useState(false)
    const [zip, setZip] = useState('')
    const [address, setAddress] = useState<OrderInformation>({
        address_1: '',
        address_2: '',
        zip: zip,
        country: '',
        suburb: '',
        state: '',
        city: '',
        email: '',
        phone_number: ''
    })

    const products_in_cart = useCartStore(state => state.cart)
    const total_price = useCartStore(state => state.totalPrice)
    const delete_item_from_cart = useCartStore(state => state.removeFromCart)
    const add_product_to_cart = useCartStore(state => state.addToCart)
    const remove_all_of_product = useCartStore(state => state.removeAllOfProduct)

    const navigate = useNavigate()

    const handleReturnStore = (url: string) => {
        navigate(url)
    }

    useEffect(() => {
        if(zip !== ""){
            setAddress((prevAddress: any) => ({
                ...prevAddress,
                zip: zip
            }))
        }
    }, [zip])

    return (
        <div className="lg:px-52 px-10">
            <section className="mt-10 text-gray-800 pb-5 border-b-2 border-gray-200">
                <p className="text-[2.5em] font-bold tracking-tighter">Review your bag.</p>
                <p className="text-lg font-semibold ">Free delivery and free returns</p>
                <div className="w-full bg-[#F5F5F7] px-16 py-4 rounded-md mt-10 ">
                    <center className="mx-auto w-3/4 text-start relative">
                    <img src={CellHomeLogo} alt="Logo" className="w-5 absolute top-1 -left-6" />
                    Items not purchased with a one time payment may be eligible for $41.50/mo.per month at 0% APRfootnote◊ when you check out with Apple Card Monthly Installments. <Link to={''} className="text-blue-500 underline">Learn more</Link></center>
                </div>
            </section>

            {products_in_cart.length > 0 ? (
                <>
                <section className="inline-block mt-5 w-full border-b-2 border-gray-200">
                    <div className="flex-col gap-2">
                        <AnimatePresence mode="wait">
                            {products_in_cart.map((item: Product, index) => (
                                <motion.div 
                                    key={item.slug}
                                    className="w-full px-5 py-5 flex relative border-b-2 border-gray-[#fff]"
                                    variants={itemVariants}
                                    animate='visible'
                                    exit='hidden'
                                    layoutId={item.slug}
                                >
                                    <img src={`${import.meta.env.VITE_BACKEND_URL}${item.image}`} className='w-40 object-cover rounded-md' />
                                    <div className="text-gray-800 ml-2">
                                        <p className="text-3xl tracking-tighter font-semibold">{item.name}</p>
                                        <p className="mt-5">{item.description}</p>
                                        <p className="mt-7 font-semibold text-xl flex">
                                            <span className="text-gray-600 font-semibold">Quantity: &nbsp;</span>

                                            <div className="relative px-5">
                                                <p>{item.quantity}</p>
                                                <ChevronDownIcon className="w-4 absolute -left-1 top-2 cursor-pointer" onClick={() => delete_item_from_cart(item)} />
                                                <ChevronUpIcon className="w-4 absolute -right-1 top-2 cursor-pointer" onClick={() => add_product_to_cart(item)} />
                                            </div>
                                        </p>
                                    </div>
                                    {item.quantity !== undefined && (
                                        <p className="absolute top-3 right-3 font-semibold text-3xl">${item.price*item.quantity}</p>
                                    )}
                                    <p 
                                        className="absolute bottom-3 right-3 text-lg text-blue-500 font-semibold cursor-pointer"
                                        onClick={() => remove_all_of_product(item)}
                                    >
                                        Remove
                                    </p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </section>

                <section className="inline-block mt-10 w-full relative">
                    <div className="grid gap-2 font-semi-bold relative border-b-2 pb-5 border-gray-200">
                        <p className="">Subtotal</p>
                        <p>Shipping</p> 
                        <p>Estimated tax for: </p>
                            
                        <div     className="flex gap-2">
                            <input 
                                type="text" 
                                className="px-5 py-2 rounded-xl border-2 border-gray-400 outline-none font-semibold" 
                                placeholder="Zip Code" 
                                value={zip} 
                                onChange={(e) => setZip(e.target.value)} />
                            <p 
                                className={`pt-2  ${zip !== "" ? 'cursor-pointer text-blue-600 font-semibold' : 'text-gray-500'}`} 
                                onClick={() => setShowAddress(true)}
                            >
                                Apply
                            </p>

                        </div>
                        <div className="absolute text-gray-700 font-semibold text-lg right-0 top-0">
                            <p>${total_price}</p>
                            <p className="text-end uppercase">Free</p>
                            <p className="text-end">$ --</p>
                        </div>
                    </div>
                    
                    <div className="relative text-3xl mt-5 text-gray-700 font-semibold">
                        <p>Total</p>
                        <p className="top-0 right-0 absolute">${total_price}</p>
                    </div>

                </section>

                {showAddress && <AddressComponent address={address} setAddress={setAddress} />}

                <div className="relative mt-10 w-full h-1/4 bg-red-300">
                    {!showAddress && (
                        <Link to={''} className="bg-blue-600 text-neutral-100 rounded-lg px-20 py-3 absolute right-0" >Check out</Link>
                    )}
                </div>
                            
                </>
            ) : (
                <motion.div 
                    className="w-full text-center my-40 text-2xl md:text-5xl font-bold"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5, delay: 0.5}}
                >
                    <p>Your bag is empty.</p>
                    <p onClick={() => handleReturnStore('/store')} className="text-base md:text-lg font-semibold tracking-tighter text-blue-600 cursor-pointer mt-5 underline">Buy now</p>
                </motion.div>
            )}

        </div>
    )
}

export default withScrollToTop(CartPage)