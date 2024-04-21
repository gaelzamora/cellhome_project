import { Link } from "react-router-dom"

export const itemBarOptions = [
    {id: 1, content: "All Models", to: '/'},
    {id: 2, content: "Shopping Guides", to: ''},
    {id: 3, content: "Ways to Save", to: ''},
    {id: 4, content: "Setup and Support", to: ''},
    {id: 5, content: "Accesories", to: ''},
    {id: 6, content: "The iPhone Experience", to: ''},
    {id: 7, content: "Special Stores", to: ''}
]


function ItemBar() {
  return (
    <>
        {itemBarOptions.map(option => (
            <Link to={option.to} className={`text-center text-gray-800 font-medium ${option.to === '/' ? 'border-b-2 border-y-slate-950' : '' } `}>
                <p>{option.content}</p>
            </Link>            
        ))}
    </>
  )
}

export default ItemBar
