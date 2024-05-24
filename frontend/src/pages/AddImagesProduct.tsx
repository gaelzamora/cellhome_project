import React, {useState, ChangeEvent, useEffect } from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {get_product} from '../api/products'
import { delete_image, post_image } from '../api/images';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { Loader } from '../components/Loader';
import { Image } from '../Interfaces';
import { AiFillCloseCircle } from "react-icons/ai"

function AddImagesProduct() {

    const [image, setImage] = useState<File | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [filePreview, setFilePreview] = useState<string>('');

    const queryClient = useQueryClient()

    const isDisabled = image === null
    const {slug} = useParams()

    const {
        data, isLoading
    } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => get_product(slug || '')
    })

    const addImageMutation = useMutation({
        mutationFn: post_image,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['images']})
            toast.success("Image created!")
            window.location.reload()
        },
        onError: () => {
            toast.error("Error")
            window.location.reload()
        }
    })

    const deleteImageMutation = useMutation({
        mutationFn: delete_image,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['images']}),
            toast.success('Image Deleted!')
            window.location.reload()
        },
        onError: () => {
            toast.error("Error!")
            window.location.reload()
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        addImageMutation.mutate({
            image: image,
            id_product: data.id
        })
    }


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
    
    return (  
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[700px] w-[600px] rounded-md">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Add Images
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
                            {data.images.length === 0 && (
                                <p className='text-xl tracking-tighter font-semibold py-28 text-center w-full mx-auto'>No tienes ninguna imagen a guardar</p>
                            )}
                            <div className={`w-full`}>

                                <div className='grid gap-4 sm:grid-cols-4 my-8'>
                                        {data.images.map((image: Image) => (
                                            <div className='relative'>
                                                <img src={`${import.meta.env.VITE_BACKEND_URL}${image.image}`} alt="" className='w-full h-full'/>
                                                <AiFillCloseCircle className='absolute -top-2 cursor-pointer -right-2' 
                                                    onClick={() => {
                                                        if(image.id !== undefined) {
                                                            deleteImageMutation.mutate(image.id)
                                                        }
                                                    }}/>    
                                            </div>
                                        ))}     
                                </div>

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
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items- mt-4 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                disabled={isDisabled}
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

export default AddImagesProduct
