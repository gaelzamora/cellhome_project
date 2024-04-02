import {CSSTransition} from 'react-transition-group'

type VisibleProps = {
    in: any
    children: any
}

function VisibleHover({in: inProp, children}: VisibleProps) {
  return (
    <CSSTransition
        in={inProp}
        timeout={1000}
        className={`bg-gray-800 text-white w-screen absolute h-[15vw] top-10 z-50 left-0 
        animate-fade-up animate-delay-100`}
        unmountOnExit
    >
        {children}
    </CSSTransition>
  )
}

export default VisibleHover