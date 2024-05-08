import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import {Link} from 'react-router-dom'
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { get_variations } from "../api/variants";
import { Loader } from "./Loader";
import toast from "react-hot-toast";


const Products = () => {


  const {data, isLoading, error} = useQuery({
    queryKey: ['variants'],
    queryFn: () => get_variations()
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

            <th scope="col" className="px-4 py-3 flex justify-center gap-4">Actions
            <Link
                to="add"
              >
              <AiFillPlusSquare size={22} className="text-green-300 cursor-pointer" />
            </Link>
            </th>
          </tr>
        </thead>

      </table>
    </div>
  )
}

export default Products