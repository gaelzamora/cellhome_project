import { useParams } from "react-router-dom"

function ItemPage({}) {

  const {category} = useParams()
  console.log(category)
  
  return (
    <div>
    </div>
  )
}

export default ItemPage
