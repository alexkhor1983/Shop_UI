import axios from "axios"
import * as data from "../constant/constant.json"

let tmpData = data
export const api = axios. create({
    baseURL: tmpData.Backend_url
})

/**
 Get Product Information
**/

export const getProducts = async () => {
    const response = await api.get('/popularProduct')
    return response.data
}

export const getProductsById = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

/**
 Get Payment Information
 **/

export const checkOut = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

export const getInvoiceFromStripe = async (id) => {
    const response = await api.post(`/popularProduct/${id}`)
    return response.data
}

/**
 Product Likes Part
 **/

export const getLikesById = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

/**
 Profile Part
 **/

export const getProfileInfo = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

export const ModifyProfileInfo = async (id) => {
    const response = await api.post(`/popularProduct/${id}`)
    return response.data
}

/**
 Seller Part
 **/

export const createProductForSale = async (id) => {
    const response = await api.post(`/popularProduct/${id}`)
    return response.data
}

export const ModifyProductInfo = async (id) => {
    const response = await api.put(`/popularProduct/${id}`)
    return response.data
}

export const deleteProductInfo = async (id) => {
    const response = await api.delete(`/popularProduct/${id}`)
    return response.data
}

export const viewPaymentDetail = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

/**
 Login Part
 **/

export const getLoginInfo = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

export const sendLoginInfo = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

export const sendRegistrationRequest = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

/**
 Admin Part
 **/

export const getReportInfo = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

export const getAllProductInfoIncludingDisabled = async () => {
    const response = await api.get(`/popularProduct`)
    return response.data
}

export const getAllPayment = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}

export const getSalesSummary = async (id) => {
    const response = await api.get(`/popularProduct/${id}`)
    return response.data
}
