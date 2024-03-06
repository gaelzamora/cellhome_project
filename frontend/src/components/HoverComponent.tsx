import { useState } from "react"
import { store } from "../ts/data"

type HoverProps = {
  id: number
}   

function HoverComponent({id}: HoverProps) {
  const [data, setData] = useState([
    { id, store }
  ])

  const IDFilter = id

  console.log(IDFilter)


  return (
    <div className="bg-[#f5f5f7] w-full animate-flip-down animate-duration-[1000ms] absolute left-0">
      <div className="w-3/4 mx-auto py-10">
        {store.map(element => (
          <>
            <p className={`${element.href ?? 'text-xl text-gray-800 flex-row p-2' }`}>{element.name}</p>
          </>
        ))}
      </div>
    </div>
  )
}

export default HoverComponent
