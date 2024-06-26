import React, {useState, ChangeEvent, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { Loader } from '../components/Loader';
import { post_variant } from '../api/variants';
import { get_products } from '../api/products';
import { Product, Variant } from '../Interfaces';


function AddVariationPage() {
    const [name, setName] = useState<string>('')
    const [productVar, setProduct] = useState<number>(0)
    const [variationCat, setVariationCat] = useState<string>('')
    const [sku, setSku] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const [image, setImage] = useState<File | null>(null)
    const [filePreview, setFilePreview] = useState<string>('')
    const inputRef = React.useRef<HTMLInputElement>(null) 
    const [isHovered, setIsHovered] = useState(false);
    const [viewFile, setViewFile] = useState(false)

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    console.log(variationCat)
    console.log(viewFile)
    
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products"], 
        queryFn: get_products,
    })

    const AddVariationMut = useMutation({
        mutationFn: post_variant,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['variations']})
            toast.success("Variation created!")
            navigate('/admin')
        },
        onError: () => {
            toast.error("Error!")
            navigate('/admin')
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(productVar !== 0 && variationCat !== "") {
            AddVariationMut.mutate({
                name: name,
                variation_category: variationCat,
                sku: sku,
                stock: stock,
                image: image,
                id_product: productVar
            } as Variant);
        } else {
            toast.error("Debes seleccionar una categoria y producto")
        }
    };

    useEffect(() => {{
        if(variationCat !== "color") setViewFile(false)
        else setViewFile(true)
    }}, [variationCat])

    const handleNameChange= (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleProductChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newNumber = parseInt(event.target.value)
        setProduct(newNumber);
    };

    const handleVariationCatChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setVariationCat(event.target.value)
    };

    const handleSkuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = parseInt(event.target.value, 10)
        setSku(newNumber);
    };

    const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = parseInt(event.target.value, 10)
        setStock(newNumber);
    };


    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovered(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovered(false);
    };


    const removeImage = () => {
        setImage(null)
            setIsHovered(false)
    }

    if(isLoading) return <Loader />
    if(isError) return toast.error("Hubo un error")

    if(AddVariationMut.isLoading) return <Loader />
  return (  
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[700px] w-[600px] rounded-md">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Variation
                        </h3>
                        <Link
                            to='/admin'
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex transition-all items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="defaultModal"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Name
                                </label>
                                <input
                                    value={name}
                                    onChange={handleNameChange}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="product"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Product
                                </label>
                                <select name="products" 
                                    className='px-2 py-3 w-[100%] rounded-md'
                                    value={productVar} 
                                    onChange={handleProductChange}>
                                    <option selected>Select a product</option>
                                    {data.map((product: Product) => (
                                        <>
                                            <option value={product.id}>{product.name}</option>
                                        </>
                                    ))}
                                </select>
                                
                            </div>

                            <div>
                                <label
                                    htmlFor="price"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Variation Category
                                </label>
                                <select                              
                                    className='px-2 py-3 w-[100%] rounded-md'
                                    name="variationsCats" 
                                    value={variationCat}
                                    onChange={handleVariationCatChange}
                                    >
                                    <option selected>Select a category</option>
                                    <option value="color">Color</option>
                                    <option value="capacidad">Capacidad</option>
                                    <option value="">Modelo</option>

                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="category"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Sku
                                </label>
                                <input
                                    value={sku}
                                    onChange={handleSkuChange}
                                    type="number"
                                    name="sku"
                                    id="sku"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Sku"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Stock
                                </label>
                                <input
                                    value={stock}
                                    onChange={handleStockChange}
                                    type='number'
                                    id="Stock"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Stock"
                                ></input>
                            </div>

                            {viewFile && (

                                <div className="sm:col-span-2">
                                    <div className="flex items-center justify-center w-full">
                                        {image === null ? (
                                            <label
                                                htmlFor="dropzone-file"
                                                className={`flex flex-col items-center justify-center w-full h-64 
                border-2 border-gray-600 border-dashed rounded-lg 
                cursor-pointer bg-gray-40 ${
                    isHovered ? "bg-gray-600" : "hover:bg-gray-600"
                }`}
                                                onDragEnter={handleDragEnter}
                                                onDragLeave={handleDragLeave}
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-10 h-10 mb-3 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    ></path>
                                                </svg>
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        SVG, PNG, JPG or GIF (MAX.
                                                        800x400px)
                                                    </p>
                                                </div>
                                                <input
                                                    ref={inputRef}
                                                    type="file"
                                                    id="dropzone-file"
                                                    multiple={true}
                                                    onChange={handleFileChange}
                                                    className="absolute w-full h-[300px] opacity-0"
                                                />
                                            </label>
                                        ) : (
                                            <div>
                                                <button
                                                    onClick={removeImage}
                                                    type="button"
                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                    data-modal-toggle="defaultModal"
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    <span className="sr-only">
                                                        Close modal
                                                    </span>
                                                </button>
                                                <img
                                                    className="h-48 w-96"
                                                    src={filePreview}
                                                    alt="Imagen seleccionada"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            <svg
                                className="mr-1 -ml-1 w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Add new product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddVariationPage
