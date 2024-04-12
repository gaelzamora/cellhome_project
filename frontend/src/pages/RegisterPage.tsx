import { Link, useNavigate, Navigate } from "react-router-dom"
import { registerRequest } from "../api/users"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import {useAuthStore} from '../store/auth'

function RegisterPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();

  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: () => registerRequest(email, first_name, last_name, password),
      onSuccess: () => {
        toast.success("Registro exitoso! Hace login!")
        navigate("/login")
      },
      onError: () => {
        toast.error("Hubo un error, intenta devuelta")
      }
  })

  const handleMatch = () => {
    if (password !== re_password) {
      return false
    } else {
      return true
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
      if (password !== re_password) {
        toast.error("Las passwords deben coincidir")
      } else {
        registerMutation.mutate()
      }
  }

  if (registerMutation.isLoading) return <p>Loading...</p>
  if (isAuth) return (<Navigate to="/"/>)

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-20 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up here</h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">First name</label>
            <div className="mt-2">
              <input 
              type="name"
              value={first_name}
              onChange = {(e) => setFirstName(e.target.value)}
              required 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
            <div className="mt-2">
              <input 
              type="name" 
              value={last_name}
              onChange = {(e) => setLastName(e.target.value)} 
              required 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input 
              type="email"
              value={email} 
              onChange = {(e) => setEmail(e.target.value)}
              required 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="mt-2">
              <input 
              type="password"
              value={password} 
              onChange = {(e) => setPassword(e.target.value)}
              required 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
            <div className="mt-2">
              <input 
              id="re_password" 
              name="re_password" 
              type="password"
              value={re_password}
              onChange = {(e) => setRePassword(e.target.value)}
              required 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
            </div>
          </div>
          {handleMatch() ? false : <p className='text-sm font-medium text-red-500'>Passwords must match</p>}
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-gray-800 px-3 transition-all py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?
          <Link to='/accounts/login' className="font-semibold leading-6 text-gray-800 hover:text-gray-700">{' '}Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
