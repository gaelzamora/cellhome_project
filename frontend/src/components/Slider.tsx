import { useEffect, useRef, useState } from "react"
import Card from "./Card"
import { Item } from "../Interfaces"
import { Button } from "./Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const TRANSLATE_AMOUNT = 200

type SliderProps = {
  items: any
}

function Slider({items}: SliderProps) {
  const [translate, setTranslate] = useState(0)
  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  

  useEffect (() => {
    if(containerRef.current == null) return

    const observer = new ResizeObserver(entries => {
        const container = entries[0]?.target
        if(container  == null) return

        setIsLeftVisible(translate > 0)
        setIsRightVisible(translate + container.clientWidth < container.scrollWidth)
    })

    observer.observe(containerRef.current)
    console.log(items)
    return () => {
        observer.disconnect()
    }
    
  }, [items, translate])
  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
        <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content" style={{transform: `translateX(-${translate}px)`}}>
          {items.map((item: Item) => (
            <Card 
              product={item.product}
              title={item.title}
              image={item.img}
              description={item.description}
              color={item.isColor}
            />
          ))}
        </div>
        {isLeftVisible && (
          <div className="absolute left-0 top-1/2 z-50 -translate-x-1/2 bg-gradient-to-r from-25% to-transparent w-2/4 h-full ">
            <Button
              variant="ghost"
              size="icon"
              className="h-full aspect-square w-auto p-1.5"
              onClick={() => {
                setTranslate(translate => {
                  const newTranslate = translate - TRANSLATE_AMOUNT
                  if(newTranslate <= 0) return 0
                  return newTranslate
                })
              }}
            >
              <ChevronLeft />
            </Button>
          </div>
        )}

        {isRightVisible && (
          <div className="absolute right-0 top-1/2 -translate-x-1/2 bg-gradient-to-r from-10% to-transparent w-2/4 h-full flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="h-full aspect-square w-auto p-1.5"
              onClick={() => {
                setTranslate(translate => {
                  if(containerRef.current == null){
                    return translate 
                  }
                  const newTranslate = translate + TRANSLATE_AMOUNT
                  const edge = containerRef.current.scrollWidth
                  const width = containerRef.current.clientWidth
                  if(newTranslate + width >= edge){
                    return edge - width
                  }
                  return newTranslate
                })
              }}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
    </div>
  )
}

export default Slider
