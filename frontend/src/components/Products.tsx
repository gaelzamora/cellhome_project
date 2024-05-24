import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit, AiFillPlusSquare } from "react-icons/ai";
import {Link} from 'react-router-dom'
import {delete_product, get_products} from '../api/products'
import {toast} from 'react-hot-toast'
import {useQueryClient, useMutation, useQuery} from '@tanstack/react-query'
import {Loader} from './Loader'
import { Product } from "../Interfaces";

interface Props {
  results: any;
}

const Products = ({results}: Props) => {

    const queryClient = useQueryClient()

    const {
        data, 
        isLoading, 
        error
    } = useQuery({
        queryKey: ['products'],
        queryFn: get_products
    })


    const deleteProdMutation = useMutation({
        mutationFn: delete_product,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["products"]})
            toast.success("Product deleted!")
        },
        onError: () => {
            toast.error("Error!")
        }
    });


    if(isLoading) return <Loader />
    if (error instanceof Error) return <>{toast.error(error.message)}</>
    
  return (
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-4 py-3">Product ID</th>
                <th scope="col" className="px-4 py-3">Nombre</th>
                <th scope="col" className="px-4 py-3">Precio</th>
                <th scope="col" className="px-4 py-3">Disponible</th>
                <th scope="col" className="px-4 py-3">Image's</th>
                <th scope="col" className="px-4 py-3 flex justify-center gap-4">Actions
                <Link
                    to="add"
                >
                <AiFillPlusSquare size={22} className="text-green-300 cursor-pointer" />
                </Link>
                </th>
            </tr>
            </thead>
            {results && results.products.length > 0 ? (
                        <>
                            {results &&
                                results.products.map((product: Product) => (
                                    <tbody>
                                        <tr className="border-b dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {product.id}
                                            </th>

                                            <td className="px-4 py-3">
                                                {product.name}
                                            </td>

                                            <td className="px-4 py-3">
                                                $ {product.price}
                                            </td>

                                            <td className="px-4 py-3">
                                                {product.count_in_stock}
                                            </td>

                                            <td className="px-4 py-3">
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} alt="Not image" className="text-center rounded-full w-10 h-10 "/>
                                            </td>

                                            <td className="px-4 py-3">
                                                <div className="flex justify-center gap-4">
                                                    <BsFillTrashFill
                                                        onClick={() => {
                                                            if (
                                                                product.id !==
                                                                undefined
                                                            ) {
                                                                deleteProdMutation.mutate(
                                                                    product.id
                                                                );
                                                            }
                                                        }}
                                                        size={22}
                                                        className="text-red-300 cursor-pointer"
                                                    />

                                                    <Link to={`edit/${product.id}`}>
                                                        <AiFillEdit
                                                            size={22}
                                                            className="text-green-500 cursor-pointer"
                                                        />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                        </>
                    ) : (
                                    <tbody>
                                        {data.map((product: Product) => (
                                            <tr className="border-b dark:border-gray-700">
                                                <th
                                                    scope="row"
                                                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {product.id}
                                                </th>

                                                <td className="px-4 py-3">
                                                    {product.name}
                                                </td>

                                                <td className="px-4 py-3">
                                                    $ {product.price}
                                                </td>

                                                <td className="px-4 py-3">
                                                    {product.count_in_stock}
                                                </td>

                                                <td className="px-4 py-3">
                                                    <Link to={`add_images/${product.slug_url}/`}>
                                                        <img src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} alt="Not image" 
                                                            className="text-center rounded-full w-10 h-10 hover:opacity-50 transition-all delay-[50] cursor-pointer"
                                                        />
                                                    </Link>
                                                </td>

                                                <td className="px-4 py-3">
                                                    <div className="flex justify-center gap-4">
                                                        <BsFillTrashFill
                                                            onClick={() => {
                                                                if (
                                                                    product.id !==
                                                                    undefined
                                                                ) {
                                                                    deleteProdMutation.mutate(
                                                                        product.id
                                                                    );
                                                                }
                                                            }}
                                                            size={22}
                                                            className="text-red-300 cursor-pointer"
                                                        />

                                                        <Link
                                                            to={`edit/${product.id}`}
                                                        >
                                                            <AiFillEdit
                                                                size={22}
                                                                className="text-green-500 cursor-pointer"
                                                            />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                    )}

        </table>
        
        </div>
        
  )
}

export default Products