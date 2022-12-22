import React, {useState} from 'react'
import styled from "styled-components";
import { mobile } from "../../../responsive";
import {
    editAccountPassword,
    forgetPasswordFormRequest,
    forgetPasswordRequest,
    sendForgetPasswordRequest
} from "../../../components/api/axios";
import {set} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 60%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const SendUsernameForgetPassword = () => {
    const navigate = useNavigate();

    const handleForgetRequest = e => {

        e.preventDefault();

        let username = e.target.username.value;
        if(username === ""){
            const notify = () => toast.info("username should not be empty");
            notify()
            return
        }

        sendForgetPasswordRequest(username).then(() => {
            const notify = () => toast.success("Verification mail has send");
            notify()
            return
        }).catch(() => {
            const notify = () => toast.error("Cannot send verification email, server error");
            notify()
            return
        })

    }

    return (
        <Container>
            <Wrapper>
                <Title>EDIT ACCOUNT PASSWORD</Title>
                <Form onSubmit={handleForgetRequest} >
                    <Input name="username" placeholder="username" />
                    <Button style={{"margin-top":"20px"}} type="submit" > Request Change</Button>  <Button onClick={()=>{navigate("/login")}} style={{"margin-left":"20px","margin-top":"20px"}} type="cancel" > Cancel</Button>
                </Form>
            </Wrapper>
        </Container>
    );
};

export default SendUsernameForgetPassword;