import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import {Link} from 'react-router-dom'
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { get_variations } from "../api/variants";
import { Loader } from "./Loader";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Product, Variant } from "../Interfaces";

const Products = () => {
  const {ref, inView} = useInView()

  useEffect(() => {
    if(inView) {
      fetchNextPage()
    }
  }, [])

  const {
    data, 
    isLoading, 
    error, 
    isFetchingNextPage, 
    fetchNextPage, 
    hasNextPage
  } = useInfiniteQuery(['variations'], get_variations, {
      getNextPageParam: (page: any) => page.meta.next,
    })


  if(isLoading) return <Loader />
  if(error instanceof Error) return toast.error(error.message)
    console.log(data)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">Variant ID</th>
            <th scope="col" className="px-4 py-3">Nombre</th>
            <th scope="col" className="px-4 py-3">Choice</th>
            <th scope="col" className="px-4 py-3">Producto</th>
            <th scope="col" className="px-4 py-3">Stock</th>
            <th scope="col" className="px-4 py-3">Image</th>

            <th scope="col" className="px-4 py-3 flex justify-center gap-4">Actions
            <Link
                to="addVariation"
              >
              <AiFillPlusSquare size={22} className="text-green-300 cursor-pointer" />
            </Link>
            </th>
          </tr>
        </thead>

        {data?.pages.map((page: any) => (
          <>
            <tbody key={page.meta.next}>
              {page.data.map((variant: Variant) => (
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {variant.id}
                  </th>

                  <td className="px-4 py-3">
                    {variant.name}
                  </td>

                  <td className="px-4 py-3">
                    {variant.variation_category}
                  </td>

                  <td className="px-4 py-3">
                    {variant.id_product}
                  </td>                  
                  <td className="px-4 py-3">
                    {variant.stock}
                  </td>

                  <td className="px-4 py-3">
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${variant.image}`} alt="Not image" className="text-center rounded-full w-10 h-10"/>
                  </td>

                </tr>
              ))}
            </tbody>
          </>
        ))}

      </table>
    </div>
  )
}

export default Products