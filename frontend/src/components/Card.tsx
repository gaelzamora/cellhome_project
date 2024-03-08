import { useState } from "react"

type ItemProps = {
    product: string
    title: string
    description: string
    image: string
    color?: boolean
}   

function Card({product, title, description, image}: ItemProps) {

    const [showLetter, setShowLetter] = useState(false)


    return (
        <div className="" >
            <div
                className="" 
                style={{backgroundImage: `url(${image})`}}
            />

            <div className="">
                <p>{product}</p>
                <p>{title}</p>
                <p>{description}</p>
            </div>

            {!showLetter && (
                <button onClick={() => setShowLetter(true)} name="Select" />
            )}

            {showLetter && (
                <p>pspaspa</p>

            )}
        </div>
  )
}

export default Card
