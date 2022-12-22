import React, {useEffect} from 'react';
import "./Success.css"
import {useNavigate, useParams} from "react-router-dom";
import {createPaymentHistory} from "../../../components/api/axios";
import {toast} from "react-toastify";
import {useSelector,useDispatch} from "react-redux";
import {clearCart} from "../../../cartSlice";

const Success = () => {

    const {sessionId} = useParams()
    const Navigate = useNavigate();
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();

    useEffect(()=>{
        createPaymentHistory(sessionId,cart?.cartItems).then(()=>{
            dispatch(clearCart());
            const notify = () => toast.success("Payment created to database, and cart cleared");
            notify()
            Navigate("/transaction")
            return
        }).catch(err => {
            const notify = () => toast.error(err.message);
            notify()
            Navigate("/")
            return
        })
    },[]);
    return(
        <div>
            <div className="card">
                <div style={{"border-radius":"200px", "height":"200px","width":"200px","background":"#F8FAF5", "margin":"0 auto"}}>
                    <i className="checkmark">✓</i>
                </div>
                <h1>Success</h1>
                <p>We received your purchase request;<br/> we'll be in touch shortly!</p>
            </div>
        </div>
    )
}

export default Success;