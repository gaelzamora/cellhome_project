import { Link } from "react-router-dom"

type HoverProps = {
  id: number
}

function HoverComponent({id}: HoverProps) {
  return (
    <div className="absolute bg-gray-300 w-full h-96 animate-flip-down animate-duration-[1000ms]">
      {id}
      <Link to="/">Hola</Link>
    </div>
  )
}

export default HoverComponent
