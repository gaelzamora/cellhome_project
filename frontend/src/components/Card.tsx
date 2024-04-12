
type ItemProps = {
    product: string
    title: string
    description: string
    img?: string
    isColor?: boolean
}   


function Card({product, title, description, img, isColor}: ItemProps) {
    return (
        <div className="relative">
            <img src={img} alt="Imagen Item" className="rounded-[1.25rem]" />

            <div className= {`absolute top-5 py-2 px-5 ${isColor ? 'text-black' : 'text-white'} tracking-tight` }>
                <p className="text-[0.775rem] uppercase font-[700] pb-1">{product}</p>
                <p className="pb-1 text-[1.5rem] font-bold">{title}</p>
                <p className="text-[1rem]">{description}</p>
            </div>
        </div>
  )
}

export default Card
