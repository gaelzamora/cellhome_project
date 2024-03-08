import { elements } from "../ts/data"

type HoverProps = {
  id: number
}

type ElementProps = {
  name: string
  href?: string
}

function HoverComponent({id}: HoverProps) {

  const data = elements[id]

  return (
    <div className="bg-[#f5f5f7] w-full animate-flip-down animate-duration-[1000ms] absolute left-0 border-b-4 border-gray-300">
      <div className="w-3/4 mx-auto py-10">
        {data?.map((element: ElementProps) => (
          <>
            <p className={`${element.href ? 'text-xl text-gray-800 flex-row' : 'text-gray-500 text-[14px]' } py-1`}>{element.name}</p>
          </>
        ))}
      </div>
    </div>
  )
}

export default HoverComponent
