import React from 'react'
import { BrowserRouter,Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from '../../components/Scroll/index';
import Home from '../../pages/home';
import Login from '../../pages/auth/login';
import Register from '../../pages/auth/register';
import DetailProduct from '../../pages/detailProduct/[id]';
import Cart from '../../pages/cart/[id]';
import Profile from '../../pages/profile/[id]';
import Seller from '../../pages/profile/seller/[id]';
import SellingProduct from '../../pages/profile/seller/sellingProduct';
import OrderCancel from '../../pages/profile/seller/orderCancel/[id]';
import MyOrder from '../../pages/profile/seller/myOrder/[id]';
import EditSeller from '../../pages/profile/seller/editSeller/[id]';
import MyProductSeller from '../../pages/profile/seller/myProduct/[id]';
import EditProduct from '../../pages/profile/seller/myProduct/editProduct/[id]';
import Transaction from '../../pages/cart/transaction/[id]';
import Customer from '../../pages/profile/custommer/[id]';
import MyOrderCustommer from '../../pages/profile/custommer/myOrder/[id]';
import ShippingAddress from '../../pages/profile/custommer/shippingAddress/[id]';





const Router = () => {
  return (
    <div> 
    <BrowserRouter>
    <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace="true" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/transaction/:id" element={<Transaction />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* seller */}
          <Route path="/profile/seller/:id" element={<Seller />} />
          <Route path="/profile/my-product/:id" element={<MyProductSeller />} />
          <Route path="/profile/update-product/:id" element={<EditProduct />} />
          <Route path="/profile/selling-product" element={<SellingProduct />} />
          <Route path="/profile/order-cancel/:id" element={<OrderCancel />} />
          <Route path="/profile/my-order/:id" element={<MyOrder />} />
          <Route path="/profile/edit-seller/:id" element={<EditSeller />} />
          {/* custommer */}
          <Route path="/profile/custommer/:id" element={<Customer />} />
          <Route path="/profile/my-order/custommer/:id" element={<MyOrderCustommer />} />
          <Route path="/profile/shipping-address/:id" element={<ShippingAddress />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router