type HoverableElementsProps = {
    children: string
}

const HoverableElement  = ({children}: HoverableElementsProps) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default HoverableElement;