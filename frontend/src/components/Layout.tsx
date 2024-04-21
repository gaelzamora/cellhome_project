import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ()  => {
  return (
    <div className="bg-[#f5f5f7]">
      <Toaster />
      <Navbar />
      <div>
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
