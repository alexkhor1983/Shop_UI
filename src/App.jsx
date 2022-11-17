import React from 'react'
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import ProductDetail from "./pages/User/product/ProductDetail";
import Home from "./pages/User/home/Home";
import ProductList from "./pages/User/productList/ProductList";
import Register from "./pages/User/register/Register";
import Login from "./pages/User/login/Login";
import Cart from "./pages/User/cart/Cart";
import CheckOut from "./pages/checkOut/CheckOut";
import Profile from "./pages/User/profile/Profile"
import EditProfileForm from "./pages/User/profile/EditProfile"

import AdminDashboard from "./pages/Admin/home/Home";
import EditProduct from "./pages/Admin/editProduct/EditProduct";
import NewUser from  "./pages/Admin/newUser/NewUser";
import AdminProduct from "./pages/Admin/product/Product";
import AdminProductList from "./pages/Admin/productList/ProductList";
import User from "./pages/Admin/user/User";
import UserList from "./pages/Admin/userList/UserList";
import Transaction from "./pages/Admin/transaction/Transaction";
import Report from "./pages/Admin/report/Report";

const App = () => {
  return (
      <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />}/>

              <Route path="/ProductList" element={<ProductList />}/>

              <Route path="/ProductDetail/:productId" element={<ProductDetail />}/>

              <Route path="/Register" element={<Register />}/>

              <Route path="/Login" element={<Login />}/>

              <Route path="/Cart" element={<Cart />}/>

              <Route path="/CheckOut" element={<CheckOut />}/>

              <Route path="/Profile" element={<Profile />}/>
              
              <Route path="/EditProfile" element={<EditProfileForm />}/>

              <Route path="/Admin/users" element={<UserList />}/>

              <Route path="/Admin/user/:userId" element={<User />}/>

              <Route path="/Admin/newUser" element={<NewUser />}/>

              <Route path="/Admin/products" element={<AdminProductList />}/>

              <Route path="/Admin/product/:productId" element={<AdminProduct />}/>

              <Route path="/Admin/editProduct/:productId" element={<EditProduct />} />

              <Route path="/Admin/transaction" element={<Transaction/>}/>

              <Route path="/Admin" element={<AdminDashboard />} />

              <Route path="/Admin/Report" element={<Report />} />

            </Routes>
          </div>
        </Router>
  );
};
export default App;