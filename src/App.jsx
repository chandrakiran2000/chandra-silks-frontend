import { BrowserRouter, Routes, Route } from "react-router-dom"

import ScrollToTop from "./components/ScrollToTop";

import Navbar from './components/user/Navbar'
import Footer from "./components/user/Footer"

import Home from './pages/user/Home'
import Cart from './pages/user/Cart'
import Orders from './pages/user/Orders'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import PageNotFound from "./pages/user/PageNotFound"

import AdminLogin from './pages/admin/AdminLogin'

import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCustomer from './pages/admin/AdminCustomer'
import AdminAddProductPage from './pages/admin/AdminAddProductPage'
import AdminEditProductPage from './pages/admin/AdminEditProductPage'

import UserProtectedRoute from "./protectedRoutes/UserProtectedRoute"
import AdminProtectedRoute from "./protectedRoutes/AdminProtectedRoute"
import './App.css'



const  App =() => {
  return(
    <BrowserRouter>
    <ScrollToTop />
      <Routes>

        {/* User Routes */}

        <Route path="/" element={
          <UserProtectedRoute>
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
          </UserProtectedRoute>
        }/>

        <Route path="/cart" element={
          <UserProtectedRoute>
          <>
            <Navbar />
            <Cart />
            <Footer />
          </>
          </UserProtectedRoute>
        } />

        <Route path="/orders" element={
          <UserProtectedRoute>
          <>
            <Navbar />
            <Orders />
            <Footer />
          </>
          </UserProtectedRoute>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      
        
        {/* Admin Routes */}

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminProtectedRoute>
        } />

        <Route path="/admin/products" element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          </AdminProtectedRoute>
        } />

        <Route path="/admin/orders" element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          </AdminProtectedRoute>
        } />

        <Route path="/admin/customers" element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminCustomer />
            </AdminLayout>
          </AdminProtectedRoute>
        } />

        <Route path="/admin/add-product" element={
          <AdminProtectedRoute>
          <AdminLayout>
            <AdminAddProductPage />
          </AdminLayout>
          </AdminProtectedRoute>
        } />

        <Route path="/admin/edit-product/:id" element={
          <AdminProtectedRoute>
            <AdminLayout>
              <AdminEditProductPage />
            </AdminLayout>
          </AdminProtectedRoute>
        } />
        
        <Route path="*" element={<PageNotFound />} />
        
        </Routes>

        
    </BrowserRouter>
  )
}

export default App

