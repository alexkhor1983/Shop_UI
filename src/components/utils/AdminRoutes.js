import { Outlet, Navigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import {toast} from "react-toastify";
import {useState} from "react";

const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    let decodedToken = "";
    let auth = false;

    try {
        decodedToken = jwt_decode(token); // validate jwt format
    } catch (error) {
        localStorage.setItem("token", "");
        const notify = () => toast.error("Token Invalid");
        notify()
    }

    if(decodedToken?.roles == "ROLE_ADMIN"){
        auth = true;
    }
    else{
        const notify = () => toast.error("Unauthorized");
        notify()
        auth = false;
    }

    return(
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes