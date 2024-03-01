
type HoverProps = {
  id: number
}

function HoverComponent({id}: HoverProps) {
  return (
    <div className="absolute bg-gray-300 w-full h-96 animate-fade-down animate-duration-[1000ms]">
      {id}
    </div>
  )
}

export default HoverComponent
