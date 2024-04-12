import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import StorePage from './pages/StorePage'
import AdminPage from './pages/AdminPage'
import AddProductPage from './pages/AddProductPage'
import DashboardPage from './pages/DashboardPage'
import {PrivateRoute, AdminPrivateRoute} from './components/PrivateRoute'
import EditProductPage from './pages/EditProductPage'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />  
          <Route path='store' element={<StorePage />} />
          <Route path='admin' element={<AdminPage />} />
          <Route path='add' element={<AddProductPage />} />

          <Route path='/accounts'>
            <Route path='login' element={<LoginPage />}/>
            <Route path='register' element={<RegisterPage />} />  
            <Route element={<PrivateRoute />}>
              <Route path='profile' element={<DashboardPage />} />
            </Route>
          </Route>

          <Route path='admin' element={<AdminPrivateRoute />} >
            <Route index element={<AdminPage />} />
            <Route path='add' element={<AddProductPage />} />
            <Route path='edit/:id' element={<EditProductPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
