import { useState } from "react"
import HoverComponent from "./HoverComponent"

type hoverProps = {
    id: number
    children: string
    setViewDropDown: (state: boolean) => void
}

export const HoverableElement = ({id, children, setViewDropDown}: hoverProps) => {
    const [isHover, setIsHover] = useState(false)

    const handleMouseEnter = () => {
        setIsHover(true)
        setViewDropDown(true)
    }

    const handleMouseLeave = () => {
        setIsHover(false)
        setViewDropDown(false)
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
