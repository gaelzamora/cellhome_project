import { Outlet, useLocation, useParams } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./Navbar"
import Footer from "./Footer"
import SearchModal from "./SearchModal"
import { useState } from "react"

const Layout = ()  => {
  const [openSearch, setOpenSearch] = useState(false)
  const location = useLocation()
  const {category, slug} = useParams()

  return (
    <div className={`${location.pathname !== '/store/yoursaves' ? 'bg-[#F5F5F7]' : 'bg-[#fff]'} 
    ${location.pathname !== `/store/${category}/slug` ? 'bg-[#fff]' : ''}`}>
      <Toaster />
      <Navbar openSearch={openSearch} setOpenSearch={setOpenSearch} />
      <div>
        <SearchModal setOpen={setOpenSearch} isOpen={openSearch} />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
