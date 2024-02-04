import { Link } from "react-router-dom"

function DashboardPage() {
  return (
    <section className="pt-20">
        <div className="bg-white shadow-lg w-[90%] mx-auto lg:flex ">
            <div className="flex text-gray-800 lg:w-[15%] items-center justify-center lg:flex-col cursor-pointer md:text-center lg:text-left">
                <Link 
                to='/accounts/profile' 
                className={`${location.pathname === '/accounts/profile' ? 'border-r-2 border-r-slate-500' : ''} p-4 w-full`}>
                    Cuenta
                </Link>
                <Link 
                to='/' 
                className={`${location.pathname === '/accounts/' ? 'border-r-2 border-r-slate-500' : ''} p-4 w-full`}>
                    Tus Selecciones
                </Link>
                <Link 
                to='/' 
                className={`${location.pathname === '/accounts/' ? 'border-r-2 border-r-slate-500' : ''} p-4 w-full`}>
                    Pedidos
                </Link>
                <Link 
                to='/' 
                className={`${location.pathname === '/accounts/' ? 'border-r-2 border-r-slate-500' : ''} p-4 w-full`}>
                    Metodos de Pago
                </Link>
                <Link 
                to='/' 
                className={`${location.pathname === '/accounts/' ? 'border-r-2 border-r-slate-500' : ''} p-4 w-full`}>
                    Seguridad
                </Link>
            </div>
            <div className="p-10 w-screen">
                asas
            </div>
        </div>
    </section>
  )
}

export default DashboardPage
