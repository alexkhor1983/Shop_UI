import React, {useEffect} from 'react';
import "./Success.css"
import {useNavigate, useParams} from "react-router-dom";
import {createPaymentHistory} from "../../../components/api/axios";
import {toast} from "react-toastify";

const Failure = () => {

    const {sessionId} = useParams()
    const Navigate = useNavigate();

    useEffect(()=>{
            const notify = () => toast.success("Payment cancelled");
            notify()
            Navigate("/cart")
            return
    },[]);
    return(
        <div>
            <div className="card">
                <div style={{"border-radius":"200px", "height":"200px","width":"200px","background":"#faf6f5", "margin":"0 auto"}}>
                    <i className="checkmark">✘</i>
                </div>
                <h1>Failure</h1>
                <p>Sorry, we cannot received your purchase request;<br/> The checkout process failed, feel free to contact us if there is any issues</p>
            </div>
        </div>
    )
}

export default Failure;