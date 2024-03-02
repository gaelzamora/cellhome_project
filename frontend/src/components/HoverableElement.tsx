import { useState } from "react"
import HoverComponent from "./HoverComponent"

type hoverProps = {
    id: number
    children: string

}

export const HoverableElement = ({id, children}: hoverProps) => {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        console.log("El mouse entro: ", id)
        setIsHover(true)
    }

    const handleMouseLeave = () => {
        console.log("El mouse se fue", id)
        setIsHover(false)
    }

    return (
        <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isHover && <HoverComponent id={id} />}
        </div>
    )
}
