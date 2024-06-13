import { useEffect, useRef, useState } from "react"
import { Image } from "../Interfaces"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

type ImagesPillsProps = {
    images: Image[]
    mainImage: File | null
    currentImage: File | null
    setCurrentImage: any
}

const TRANSLATE_AMOUNT = 150

function ImagesPills({images, mainImage,currentImage ,setCurrentImage}: ImagesPillsProps) {
    const [translate, setTranslate] = useState(0)
    const [isLeftVisible, setIsLeftVisible] = useState(false)
    const [isRightVisible, setIsRightVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(containerRef.current == null) return
        const observer = new ResizeObserver(entries => {
            const container = entries[0]?.target
            if(container == null) return

            setIsLeftVisible(translate > 0)
            setIsRightVisible(translate + container.clientWidth < container.scrollWidth)
        })
        observer.observe(containerRef.current)

        return () => {
            observer.disconnect()
        }
    }, [translate])


    const handleChangeImage = (image: File | null) => {
        setCurrentImage(image)
    }

    return (
        <div className="overflow-x-hidden relative" ref={containerRef}>
            <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style={{transform: `translateX(-${translate}px)`}}>
                <img src={`${import.meta.env.VITE_BACKEND_URL}${mainImage}`}  alt="Imagen" className={`w-14 h-14 cursor-pointer hover:opacity-40 transition-opacity ${mainImage === currentImage ? 'opacity-40' : ''}`} onClick={() => handleChangeImage(mainImage) } />
                {images.map((image: any) => (
                    <img src={`${import.meta.env.VITE_BACKEND_URL}${image.image}`}  alt="Imagen" className={`w-14 h-14 cursor-pointer hover:opacity-40 transition-opacity ${image.image === currentImage ? 'opacity-40' : ''}`} onClick={() => handleChangeImage(image.image) }/>
                ))}
            </div>
            {isLeftVisible && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 to-transparent w-12 h-3/4 rounded-full hover:bg-white/80 transition-all delay-200 duration-200">
                    <button 
                        className="h-full aspect-square w-auto p-1.5" 
                        onClick={() => {
                            setTranslate(translate => {
                                const newTranslate = translate - TRANSLATE_AMOUNT
                                if(newTranslate <= 0) return 0
                                return newTranslate
                            }
                            )
                        }}
                    >
                        <ChevronLeftIcon />
                    </button>
                </div>
            )}

            {isRightVisible && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 to-transparent w-12 h-3/4 flex justify-end rounded-full hover:bg-white/80 transition-all delay-100 duration-100">
                    <button 
                        className="h-full aspect-square w-auto p-1.5" 
                        onClick={() => {
                            setTranslate(translate => {
                                if(containerRef.current == null) {
                                    return translate
                                }
                                const newTranslate = translate + TRANSLATE_AMOUNT
                                const edge = containerRef.current.scrollWidth
                                const width = containerRef.current.clientWidth
                                if(newTranslate + width >= edge) {
                                    return edge - width
                                }
                                return newTranslate
                            }
                            )
                        }}
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
            )}
        </div>
    )
}

export default ImagesPills
