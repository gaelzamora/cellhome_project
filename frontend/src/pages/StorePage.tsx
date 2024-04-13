import { useInfiniteQuery } from "@tanstack/react-query"
import { get_products } from "../api/products"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useInView } from "react-intersection-observer"
import iconSupport from '../assets/support.jpg'
import Slider from "../components/Slider"
import { Link } from "react-router-dom"

import { categories } from "../ts/data"



function StorePage() {

  const {inView} = useInView()
  
  useEffect(() => {
    if(inView){
      fetchNextPage()
    }
  }, [inView])
  
  const {
    error,
    fetchNextPage,
  } = useInfiniteQuery(['products'], get_products, {
    getNextPageParam: (page: any) => page.meta.next,
  })

  if(error instanceof Error) return <>{toast.error(error.message)}</>
  return (
    <div className="lg:px-32 px-16 overflow-hidden">
      <header className=" mt-10 grid-cols-[200px_minmax(900px,_1fr)_100px]">
        <section className="py-20 relative">
          <div className="lg:w-[45%]">
            <p className="text-gray-500 tracking-tighter text-[3em] font-bold"><span className="text-black">Store.</span> The best way to buy the
            products you love.</p>
          </div>
          <div className="lg:absolute gap-3 z-10 right-0 lg:top-24 md:flex-col">
            <div className="flex gap-3">
              <img src={iconSupport} className="w-9 h-9 mt-2"/>
              <div className="mb-2">
                <p className="font-bold">Need shopping help?</p>
                <a href="/" className="text-blue-700">Ask a Specialist</a>
              </div>
            </div>
            <div className="flex">
              <div>
                <p className="font-bold">Visit an Apple Store</p>
                <a href="/" className="text-blue-700">Find one near you</a>
              </div>
            </div>
          </div>
        </section>
      </header>
      <section className=" flex gap-2 mx-auto">
        {categories.map(categorie => (
          <Link to=''>
            <Link to={`buy-${categorie.link}`} className="text-center text-gray-700 font-semibold">
              <img src={categorie.image} alt="itemimage" className="w-32 mb-3" />
              <p>{categorie.name}</p>
            </Link>
          </Link>
        ))}
      </section>
      <section className="mt-20">
          <p className="text-gray-500 font-bold text-[1.7em]"><span className="text-black">The latest.</span> Take a look at what's new, right now.</p>
          <div className="overflow-x-hidden">
            <div className="sticky top-0 pb-4 mt-4 ">
              <Slider />
            </div>
          </div>
      </section>

      <section className="mt-16 ">
        <p className="text-gray-500 font-bold text-[1.7em]"><span className="text-black">Help is here.</span> Whenever and however you need it.</p>
        <div className="m-auto ">
        </div>
      </section>
    </div>
  )
}

export default StorePage
