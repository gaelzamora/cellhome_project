import { useState } from "react"
import HoverComponent from "./HoverComponent"

type hoverProps = {
    id: number
    children: string
    setViewDropDown: (state: boolean) => void
    setStillDropDown: (state: boolean) => void
}

export const HoverableElement = ({id, children, setViewDropDown, setStillDropDown}: hoverProps) => {
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
            {isHover && <HoverComponent id={id} setIsHover={setIsHover} setViewDropDown={setViewDropDown} setStillDropDown={setStillDropDown} />}
        </div>
    )
}
