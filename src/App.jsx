import React from 'react'
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import { ConfirmProvider } from "material-ui-confirm";
import ProductDetail from "./pages/User/product/ProductDetail";
import Home from "./pages/User/home/Home";
import ProductList from "./pages/User/productList/ProductList";
import Register from "./pages/User/register/Register";
import Login from "./pages/User/login/Login";
import Cart from "./pages/User/cart/Cart";
import Profile from "./pages/User/profile/Profile"
import EditProfileForm from "./pages/User/profile/EditProfile"

import AdminDashboard from "./pages/Admin/home/Home";
import EditProduct from "./pages/User/productSales/pages/editProduct/EditProduct";
import NewUser from  "./pages/Admin/newUser/NewUser";
import AdminProductList from "./pages/Admin/productList/ProductList";
import UserList from "./pages/Admin/userList/UserList";
import Report from "./pages/Admin/report/Report";
import Activate from "./pages/User/activate/activate";
import ForgetPassword from "./pages/User/forgetPassword/ForgetPassword";
import AddProduct from "./pages/User/productSales/pages/addProduct/AddProduct";
import EditPassword from "./pages/User/profile/EditPassword";
import Success from "./pages/User/payment/Success";
import TransactionUser from "./pages/User/transactionUser/TransactionUser";
import Failure from "./pages/User/payment/Failure";
import SendUsernameForgetPassword from "./pages/User/forgetPassword/sendUsernameForgetPassword";
import ProductSales from "./pages/User/productSales/productSales";
import RatingProduct from "./pages/User/rating/RatingProduct";
import AdminTransaction from "./pages/Admin/transaction/Transaction";
import LikeList from "./pages/User/likeList/LikeList";
import Error404 from "./pages/404";
import TransactionSeller from "./pages/User/productSales/pages/transactionSeller/TransactionSeller";
import AdminRoutes from "./components/utils/AdminRoutes"
import ReportSummary from "./pages/Admin/report/Report";
import HotSalesReport from "./pages/Admin/report/Report";
import CustomerConsumeReport from "./pages/Admin/report/Report";

const App = () => {
  return (
      <ConfirmProvider>
      <Router>
          <div>
            <ToastContainer/>
            <Routes>

                <Route exact path="/" element={<Home />} exact/>

                <Route path="/productList" element={<ProductList />}/>

                <Route path="/productDetail/:productId" element={<ProductDetail />}/>

                <Route path="/register" element={<Register />}/>

                <Route path="/login" element={<Login />}/>

                <Route path="/user/activate/:username/:uuid" element={<Activate />}/>

                <Route path="/forgetPassword" element={<SendUsernameForgetPassword />} />

                <Route path="/user/forgetPassword/:username/:uuid" element={<ForgetPassword />}/>

                <Route path="/cart" element={<Cart />}/>

                <Route path="/transaction" element={<TransactionUser />}/>

                <Route path="/transaction/rating/:orderId" element={<RatingProduct />}/>

                <Route path="/payment/success/:sessionId" element={<Success />} />

                <Route path="/payment/failed" element={<Failure />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/likeList" element={<LikeList />}/>

                <Route path="/editProfile" element={<EditProfileForm />}/>

                <Route path="/editPassword" element={<EditPassword />}/>

                <Route path="/myProduct" element={<ProductSales />}/>

                <Route path="/myProduct/addProduct" element={<AddProduct />}/>

                <Route path="/myProduct/editProduct/:productId" element={<EditProduct />}/>

                <Route path="/myProduct/transaction" element={<TransactionSeller />}/>

                <Route element={<AdminRoutes />}>

                    <Route path="/admin" element={<AdminDashboard />} exact/>

                    <Route path="/admin/user" element={<UserList />}/>

                    <Route path="/admin/user/newUser" element={<NewUser />}/>

                    <Route path="/admin/product" element={<AdminProductList />}/>

                    <Route path="/admin/product/addProduct" element={<AddProduct />}/>

                    <Route path="/admin/product/editProduct/:productId" element={<EditProduct />} />

                    <Route path="/admin/transaction" element={<AdminTransaction/>}/>

                    <Route path="/admin/summaryReport" element={<Report />} />

                    <Route path="/admin/hotSalesReport" element={<HotSalesReport />} />

                    <Route path="/admin/customerConsumeReport" element={<CustomerConsumeReport />} />

                </Route>

                <Route path="*" element={<Error404 />} />

            </Routes>

          </div>
        </Router>
        </ConfirmProvider>
  );
};
export default App;