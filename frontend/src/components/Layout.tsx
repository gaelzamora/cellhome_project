import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useState } from "react"

const Layout = ()  => {
  
  const [isBlur, setIsBlur] = useState(false)

  return (
    <div className="bg-[#f5f5f7]">
      <Toaster />
      <Navbar setIsBlur={setIsBlur}/>
      <div className={`${isBlur ? 'backdrop-blur-sm' : ''}`}>
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
