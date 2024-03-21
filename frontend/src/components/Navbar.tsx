import {Link} from 'react-router-dom'
import {useAuthStore} from '../store/auth'
import jwt_decode from 'jwt-decode'
import {HiOutlineShoppingBag, HiSearch} from 'react-icons/hi'
import cellhome from '../assets/cellhome.png'
import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition, Menu } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {Token} from '../Interfaces';
import {HoverableElement} from './HoverableElement'

const navbarElements = [
  {name: 'Store', to:'/store', id: 0},
  {name: 'iPhone', to:'/', id:1},
  {name: 'Watch', to:'/', id:2},
  {name: 'iPad', to:'/', id:3},
  {name: 'AirPods', to:'/', id:4},
  {name: 'Mac', to:'/', id:5},
  {name: 'Accesorios', to:'/', id:6},
  {name: 'Support', to:'/', id:7},
]

function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const token: string = useAuthStore.getState().access
  const {isAuth} = useAuthStore()
  const [viewDropDown, setViewDropDown] = useState(false)
  const [stillDropDown, setStillDropDown] = useState(false)

  let is_admin: boolean = false

  const handleStillDropDown = () => {
    if(viewDropDown) {
      setStillDropDown(true)
    }
  } 

  console.log("Soy view drop down: ", viewDropDown)

  console.log("Soy still", stillDropDown)

  if(isAuth){
    const tokenDecoded : Token = jwt_decode(token)
    is_admin = tokenDecoded.is_staff
  }

  const receiveState = (state: boolean) => {
    setViewDropDown(state)
  }

  function logOutFun() {
    useAuthStore.getState().logout()
    window.location.href = '/accounts/login'
  }

  function classNames(...classes: any){
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className='relative'>
      <header className={`w-full first-letter fixed top-0 ${viewDropDown ? 'bg-[#161617]' : 'bg-[#f5f5f7]'} z-40 dark:bg-gray-300`} onMouseEnter={handleStillDropDown}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 h-8 w-[60%]" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to='/' className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-10 w-auto" src={cellhome} alt="" />
            </Link>
          </div>
          <div className='flex lg:hidden'>
            <form action="">
              <HiSearch className="h-5 w-5 absolute top-3.5 ml-2 text-gray-100" aria-hi="true" />
              <input type="search" className='w-full rounded-full outline-blue-950 px-9 py-2 text-sm ralative focus:border-gray-100' placeholder='Buscar...'/>
            </form>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 text-white" aria-hi="true" />
            </button>
          </div>
          <div className='hidden md:flex gap-x-12'>
            {navbarElements.map((element: any) => (
              <Link to={element.to} className={`text-[11px] ${viewDropDown ? 'text-gray-200' : 'text-gray-700'}  font-semibold leading-loose p-1`}>
                <HoverableElement id={element.id} setViewDropDown={receiveState} setStillDropDown={setStillDropDown}>
                  {element.name}
                </HoverableElement>
              </Link>
            ))}         
          </div> 
    
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-3">
            <div className='flex'>
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setOpenSearch(true)}
              >
                <span className="sr-only">Open main menu</span>
                <HiSearch className={`h-[1.2rem] w-[1.2rem] ${viewDropDown ? 'text-gray-200' : 'text-gray-700'}`} aria-hi="true"/>
              </button>
            </div>
            
            <Menu as="div" className="relative ml-2">
                <div>
                  <Menu.Button className={`${viewDropDown ? 'text-gray-200' : 'text-gray-700'} hover:text-black dark:text-slate-200 dark:hover:text-white`}>
                    <HiOutlineShoppingBag size={18} />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-righ bg-white dark:bg-slate-950 py-1 shadow-lg ring-black ring-opacity-5 focus:outline-none">
                    
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/" className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}>
                          Pedidos
                        </Link>
                      )}
                    </Menu.Item>
                    
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/" className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}>
                          Tus selecciones
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/accounts/profile" className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}>
                          Cuenta
                        </Link>
                      )}
                    </Menu.Item>
                    {isAuth ? (
                      <Menu.Item>
                      {({ active }) => (
                          <a onClick={() => logOutFun()} className={classNames(active ? 'bg-gray-100 dark:bg-slate-700 cursor-pointer' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}>
                            Cerrar sesion
                          </a>
                      )}
                      </Menu.Item>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/accounts/login" className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}>
                            Iniciar Sesion
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                    {is_admin && is_admin && (
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/admin" className={classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-slate-200')}>
                            Admin Panel
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
            </Menu>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden z-10" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-10 w-auto"
                  src={cellhome}
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Tienda
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {store.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          iPhone
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...iphone].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>

                {isAuth? (
                  <div className="py-6 cursor-pointer">
                    <Link
                      to='/my_profile'
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Cuenta
                    </Link>
                    <a
                      onClick={logOutFun}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                    Cerrar sesion
                    </a>
                  </div>
                ) : (
                  <div className='py-6'>
                    <Link
                      to='/login'
                      className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'
                    >
                      Iniciar sesion
                    </Link>
                  </div>
                )}

              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

    </div>
  )
}

export default Navbar
