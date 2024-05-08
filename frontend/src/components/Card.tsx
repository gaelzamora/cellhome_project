import { Item } from "../Interfaces"

type ItemProps = {
    item: Item
}   


function Card(props: ItemProps) {
    const {item} = props

    return (
        <div className="relative cursor-pointer shadow-xl ">
            <img src={item.img} alt="Imagen Item" className="rounded-[1.25rem]" />

            <div className= {`absolute top-5 py-2 px-5 ${item.isWhite ? 'text-gray-700' : 'text-gray-300'} tracking-tight` }>
                <p className="text-[0.775rem] uppercase font-semibold pb-2">{item.product}</p>
                <p className="pb-1 text-[1.6rem] font-bold">{item.title}</p>
                <p className="text-[1rem]">{item.description}</p>
            </div>
        </div>
  )
}

export default Card
