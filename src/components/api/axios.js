import axios from "axios";
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import jwt_decode from 'jwt-decode';
import constant from "../constant/constant.json"

const CORSProxy = 'https://cors-anywhere.herokuapp.com/'
//Use the help of third party server to act as proxy server to handle request in different port
//Without this EC2 instance will always get CORS error from backend server, it means that server get the request
//but due to different port they don't want to take a risk to response


const guestAxios = axios.create({
    baseURL: constant.Backend_url
});

const secureAxios = axios.create({
    baseURL: constant.Backend_url
});

secureAxios.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    let decodedToken = "";
    try {
        decodedToken = jwt_decode(token); // validate jwt format
    } catch(error) {
        localStorage.setItem("token", "");
        const notify = () => toast.error("Token Invalid");
        notify()
        return <Navigate to='/Login' />
    }

    let currentDate = new Date();

    // JWT exp is in seconds, and default 24 hour in backend passed jwt token
    if (decodedToken != "" && decodedToken.exp * 86400 < currentDate.getTime()) {
        localStorage.setItem("token", "");
        const notify = () => toast.error("Token Expired");
        notify()
        return <Navigate to='/Login' />
    }
    return config;
});

/**
 Get Product Information
**/

export const getProducts = async () => {
    const response = await guestAxios.get('/product')
    return response.data
}

export const getProductsById = async (id) => {
    const response = await guestAxios.get(`/product/${id}`)
    return response.data
}

export const getOptionsById = async (id) => {
    const response = await guestAxios.get(`/product/options/${id}`)
    return response.data
}

/**
 Get Payment Information
 **/

export const checkOut = async (cartItem) => {
    const response = await secureAxios.post(`/payment/create-checkout-session`,cartItem)
    return response.data
}

export const createPaymentHistory = async (sessionId,cartItem) => {
    const response = await secureAxios.post(`/payment/createPaymentHistory/${sessionId}`,cartItem)
    return response.data
}

export const viewPaymentOfUser = async () => {
    const response = await secureAxios.get(`/payment/viewHistory`)
    return response.data
}

export const viewTransactionOfSeller = async () => {
    const response = await secureAxios.get('/payment/viewHistory/seller/')
    return response.data
}

export const ratingOrder = async (orderId,rating) => {
    const response = await secureAxios.get(`/payment/ratingOrder/${orderId}/${rating}`)
    return response.data
}

export const getProductDetailByOrderId = async (orderId) => {
    const response = await secureAxios.get(`/product/order/${orderId}`)
    return response.data
}

/**
 Product Likes Part
 **/

export const getLikesList = async () => {
    const response = await secureAxios.get(`/likeList/`)
    return response.data
}

export const createOrRemoveLikeList = async (productId) => {
    const response = await secureAxios.get(`/likeList/${productId}`)
    return response.data
}

export const checkIsLike = async (productId) => {
    const response = await secureAxios.get(`/likeList/checkLike/${productId}`)
    return response.data
}

/**
 Profile Part
 **/

export const getProfileInfo = async () => {
    const response = await secureAxios.get(`/profile/getUserInfo`)
    return response.data
}

export const ModifyProfileInfo = async (profile) => {
    console.log(profile)
    const response = await secureAxios.post(`/profile/updateUserInfo`,profile)
    return response.data
}

export const getProfileImage = async (username) => {
    const response = await guestAxios.get(`/profile/getUserInfo/getProfileImg/${username}`)
    return response.data
}

export const editAccountPassword = async (password) => {
    const response = await secureAxios.post(`/profile/editPassword`,password)
    return response.data
}

/**
 Seller Part
 **/

export const createProductForSale = async (product) => {
    const response = await secureAxios.post(`/product`,product)
    return response.data
}

export const viewProductForSale = async () => {
    const response = await secureAxios.get(`/product/seller/`)
    return response.data
}

export const getEditInfoByProductId = async (productId) => {
    const response = await secureAxios.get(`/product/seller/${productId}`)
    return response.data
}

export const ModifyProductInfo = async (productId,product) => {
    const response = await secureAxios.put(`/product/${productId}`,product)
    return response.data
}

export const deleteProductInfo = async (productId) => {
    const response = await secureAxios.delete(`/product/${productId}`)
    return response.data
}

export const deleteMultipleProductInfo = async (listOfId) => {
    const response = await secureAxios.delete(`/product/deleteMultiple`,listOfId)
    return response.data
}

/**
 Login Part
 **/

export const sendLoginInfo = async (login) => {
    const res = await guestAxios.post(`/auth/login`,login)
    return res.data
}

export const sendRegistrationRequest = async (userDetail) => {
    const response = await guestAxios.post(`/user/createUser`,userDetail)
    return response.data
}

export const sendVerificationRequest = async (username,uuid) => {
    const response = await guestAxios.get(`/user/activate/${username}/${uuid}`)
    return response.data
}

export const sendForgetPasswordRequest = async (username) => {
    const response = await guestAxios.get(`user/forgetPassword/${username}`)
    return response.data
}

export const forgetPasswordFormRequest = async (forgetPassword) => {
    const response = await guestAxios.post(`/user/forgetPassword/`,forgetPassword)
    return response.data
}

/**
 Admin Part
 **/

export const getAllUser = async () => {
    const response = await secureAxios.get(`/admin/user`)
    return response.data
}

export const deleteUser = async (username) => {
    const response = await secureAxios.delete(`/delete/${username})`)
    return response.data
}

export const createUserForAdmin = async (user) => {
    const response = await secureAxios.post(`/admin/createUser`,user)
    return response.data
}

export const getAllProductInfoIncludeDisabled = async () => {
    const response = await secureAxios.get(`/admin/product`)
    return response.data
}

export const getAllTransaction = async () => {
    const response = await secureAxios.get(`/payment/viewAllHistory`)
    return response.data
}

export const getSalesSummary = async () => {
    const response = await secureAxios.get(`/admin`)
    return response.data
}

export const getCustomerConsumeReport = async () => {
    const response = await secureAxios.get(`/admin/report/customerConsumeReport`)
    return response.data
}

export const getHotSalesReport = async () => {
    const response = await secureAxios.get(`/admin/report/productHotSalesReport`)
    return response.data
}