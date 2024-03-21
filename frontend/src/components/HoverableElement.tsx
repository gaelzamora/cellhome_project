import { useEffect, useState } from "react"
import HoverComponent from "./HoverComponent"

type hoverProps = {
    id: number
    children: string
    viewDropDown: boolean
    stillDropDown: boolean
    IDDropDown: number
    setViewDropDown: (state: boolean) => void
    setStillDropDown: (state: boolean) => void
    setIsBlur: (state: boolean) => void
    setIsNavbarColor: (state: boolean) => void
}

export const HoverableElement = ({id, children, setViewDropDown, setStillDropDown, viewDropDown, stillDropDown, setIsBlur, setIsNavbarColor, IDDropDown}: hoverProps) => {
    const [isHover, setIsHover] = useState(false)
    const [currentlyID, setCurrentlyID] = useState(-1)


    useEffect(() => {
        if(IDDropDown != currentlyID) {
            console.log(IDDropDown != currentlyID)
            setViewDropDown(false)
        }
        setCurrentlyID(IDDropDown)
    }, [IDDropDown])

    console.log("Soy el id del elemento: ", IDDropDown)

    console.log("Soy el currently", currentlyID)

    const handleMouseEnter = () => {
        setIsHover(true)
        setViewDropDown(true)
        setIsBlur(true)
        setIsNavbarColor(true)
    }

    const handleMouseLeave = () => {
        if(stillDropDown) {
            return
        }
        setIsHover(false)
        setViewDropDown(false)
        setIsBlur(false)
        setIsNavbarColor(false)
    }

    if(viewDropDown) {
        setStillDropDown(true)
    }


    return (
        <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isHover && <HoverComponent id={id} setIsHover={setIsHover} setViewDropDown={setViewDropDown} setStillDropDown={setStillDropDown} setIsNavbarColor={setIsNavbarColor} />}
        </div>
    )
}
