import {useState, useEffect, useRef} from 'react'

export const useIntersection = (options = {}): [any, boolean] => {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const elementRef = useRef()

    useEffect(() => {
        const element = elementRef.current
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting && !hasAnimated) {
                    setIsIntersecting(true)
                    setHasAnimated(true)
                    observer.disconnect()
                }
            })    
        }, options)

        if(element) {
            observer.observe(element)
        }

        return () => {
            if(element) {
                observer.unobserve(element)
            }
        }
    }, [options, hasAnimated])

    return [elementRef, isIntersecting]
}
