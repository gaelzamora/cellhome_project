import { AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import {Link} from 'react-router-dom'
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "./Loader";
import toast from "react-hot-toast";
import { Product, Variant } from "../Interfaces";
import { get_products } from "../api/products";
import { delete_variation } from "../api/variants";
import { BsFillTrashFill } from "react-icons/bs";

const Products = () => {

  const queryClient = useQueryClient()

  const {
    data, 
    isLoading, 
    error 
  } = useQuery(
    {
      queryKey: ['variations'],
      queryFn: get_products
    }
  )

  const deleteVariationMutation = useMutation({
    mutationFn: delete_variation,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["variations"]})
      toast.success("Varation deleted!")
    },
    onError: () => {
      toast.error("Error")
    }
  })


  if(isLoading) return <Loader />
  if(error instanceof Error) return toast.error(error.message)

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

            <tbody>
              {data.map((product: Product) => (
                <>
                  {product.variants?.map((variant: Variant) => (
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

                      <td className="px-4 py-3">
                                                <div className="flex justify-center gap-4">
                                                    <BsFillTrashFill
                                                        onClick={() => {
                                                            if (
                                                                variant.id !==
                                                                undefined
                                                            ) {
                                                                deleteVariationMutation.mutate(
                                                                    variant.id
                                                                );
                                                            }
                                                        }}
                                                        size={22}
                                                        className="text-red-300 cursor-pointer"
                                                    />

                                                    <Link to={`edit/${variant.id}`}>
                                                        <AiFillEdit
                                                            size={22}
                                                            className="text-green-500 cursor-pointer"
                                                        />
                                                    </Link>
                                                </div>
                                            </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>

      </table>
    </div>
  )
}

export default Products