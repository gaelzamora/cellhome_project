import { Outlet, useLocation, useParams } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ()  => {
  const location = useLocation()
  const {category, slug} = useParams()

  if(location.pathname === `/store/${category}/${slug}`) {
    console.log("Estas")
  }

  return (
    <div className={`${location.pathname !== '/store/yoursaves' ? 'bg-[#F5F5F7]' : 'bg-[#fff]'} 
    ${location.pathname !== `/store/${category}/slug` ? 'bg-[#fff]' : ''}`}>
      <Toaster />
      <Navbar />
      <div>
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
