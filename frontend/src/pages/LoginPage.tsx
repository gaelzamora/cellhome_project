import {baseURL} from '../api/useAxios'
import {Link, useNavigate, Navigate} from 'react-router-dom'
import { loginRequest } from '../api/users'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/auth'
import { Token } from '../Interfaces'
import jwt_decode from 'jwt-decode'
import {TailSpin} from 'react-loader-spinner'

function LoginPage() {

  const navigate = useNavigate()
  const {isAuth} = useAuthStore()
  const setToken = useAuthStore((state) => state.setToken)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let first_name : string

  const loginMutation = useMutation({
    mutationFn: () => loginRequest(email,password),
    onSuccess: (response) => {
      setToken(response.data.access, response.data.refresh)
      const token : string = useAuthStore.getState().access
      const tokenDecoded : Token = jwt_decode(token)
      first_name = tokenDecoded.first_name;
      toast.success(`Bienvenido/a ${first_name}`)
      navigate('/')
    },
    onError: () => {
      toast.error("Hubo un error")
      console.log(baseURL)
    }
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  if(isAuth) return (<Navigate to=  '/' />)

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 py-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in</h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
            <div className="mt-2">
              <input 
              id="email" 
              name="email" 
              type="email"
              value={email}
              placeholder='ejemplo@ejemplo.com'
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2" />
            </div>
          </div>  

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-gray-800 hover:text-gray-700">¿Olvidaste tu contraseña?</a>
              </div>
            </div>
            <div className="mt-2">
              <input 
              id="password" 
              name="password" 
              type="password"
              value={password}
              placeholder='********'
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 px-2" />
            </div>
          </div>

          <div>
            
            <button type="submit" className="flex w-full justify-center rounded-md bg-gray-800 transition-all px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {loginMutation.isLoading? (
                  <div>
                    <TailSpin
                      width={25}
                      height={25}
                      color='white'
                    />  
                  </div>
                ):(
                  <>
                    Iniciar Sesion
                  </>
                )}
                
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Aun no tienes una cuenta? {' '}
          <Link to="/accounts/register" className="font-semibold leading-6 text-gray-800 hover:text-gray-700">Registrarme</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
