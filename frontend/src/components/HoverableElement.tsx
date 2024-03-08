import { useState } from "react"
import HoverComponent from "./HoverComponent"

type hoverProps = {
    id: number
    children: string
}

export const HoverableElement = ({id, children}: hoverProps) => {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
    }

    const handleMouseLeave = () => {
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
