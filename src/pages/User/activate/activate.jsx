import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {sendVerificationRequest} from "../../../components/api/axios";
import {toast} from "react-toastify";

const Activate = () => {
    const { username,uuid } = useParams()
    const Navigate = useNavigate();

    useEffect(() => {
        if (username !== "" && uuid !== "") {
        sendVerificationRequest(username, uuid).then(() => {
            const notify = (res) => toast.success("account activated");
            notify()
            Navigate('/login')
            return
        }).catch((err) => {
            console.log(err)
            const notify = () => toast.error(err.message);
            notify()
            Navigate('/')
            return
        })
    }
        Navigate('/')
    }, []);

    return (
        <div>
            account activation
        </div>
    )
}

export default Activate;