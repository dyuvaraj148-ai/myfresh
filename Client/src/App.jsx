import { Route, Routes, useLocation } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Login from "./components/Login"
import { useAppContext } from "./context/AppContext"
import AllProducts from "./pages/AllProducts"
import ProductCatogery from "./pages/ProductCatogery"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import AddAddress from "./pages/AddAddress"
import MyOrders from "./pages/MyOrders"
import SellerLogin from "./components/seller/SellerLogin"
import SellerLayout from "./pages/seller/SellerLayout"
import AddProduct from "./pages/seller/AddProduct"
import ProductList from "./pages/seller/ProductList"
import Orders from "./pages/seller/Orders"
import MyProfile from "./pages/MyProfile"
import Loading from "./components/Loading"

function App() {
  
  const isSellerPath=useLocation().pathname.includes('seller')
  const {showUserLogin,isSeller}=useAppContext()

  return(
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath?null:<Navbar/>}
      {showUserLogin?<Login/>:null}
      <Toaster/>
      <div className={`${isSellerPath?``:`px-6 md:px-16 lg:px-24 xl:px-32`}`}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<AllProducts/>}/>
          <Route path="/products/:category" element={<ProductCatogery/>}/>
          <Route path="/products/:category/:id" element={<ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/add-address" element={<AddAddress/>}/>
          <Route path="/my-profile" element={<MyProfile/>}/>
          <Route path="/my-orders" element={<MyOrders/>}/>
          <Route path="/loader" element={<Loading/>}/>
          <Route path="/seller" element={isSeller?<SellerLayout/>:<SellerLogin/>}>
            <Route index element={isSeller?<AddProduct/>:null}/>
            <Route path='product-list' element={isSeller?<ProductList/>:null}/>
            <Route path="orders" element={isSeller?<Orders/>:null}/>
          </Route>
          
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App
