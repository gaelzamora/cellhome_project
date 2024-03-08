import { elements } from "../ts/data"

type HoverProps = {
  id: number
}

type ElementProps = {
  name: string
  href?: string
}

function HoverComponent({id}: HoverProps) {

  const handleBlurHover = () => {
    console.log("Quitando hover")
  }

  const data = elements[id]

  return (
    <div className="w-full h-screen animate-flip-down animate-duration-[1300ms] transform ease-out absolute left-0">
      <section className="w-full bg-[#161617]">
        <div className="w-3/4 mx-auto py-10">
          {data?.map((element: ElementProps) => (
            <>
              <p className={`${element.href ? 'text-2xl text-gray-100 flex-row' : 'text-gray-300 text-[12px]' } py-1`}>{element.name}</p>
            </>
          ))}
        </div>
      </section>
      <section className="h-screen backdrop-blur-sm cursor-auto" onMouseEnter={handleBlurHover}/>
    </div>
  )
}

export default HoverComponent
