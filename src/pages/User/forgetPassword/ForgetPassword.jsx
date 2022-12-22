import React, {useState} from 'react'
import styled from "styled-components";
import { mobile } from "../../../responsive";
import {editAccountPassword, forgetPasswordFormRequest, forgetPasswordRequest} from "../../../components/api/axios";
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
  min-width: 40%;
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

const ForgetPassword = () => {
  const navigate = useNavigate();

  const {username, uuid} = useParams()
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const handleEditPassword = e => {

    e.preventDefault();
    let password = e.target.newpassword.value;
    let confirmPassword = e.target.confirmpassword.value;

    if(password === "" || confirmPassword === ""){
      const notify = () => toast.info("Password should not be empty");
      notify()
      return
    }

    if(password.match(confirmPassword)){
      forgetPasswordFormRequest({username,password,uuid}).then(res => {
        console.log(res)
        const notify = () => toast.success(res);
        notify()
        navigate("/login")
        return
      }).catch(err => {
        console.log(err)
        const notify = () => toast.error(err);
        notify()
        navigate("/")
        return
      })
    }else {
      const notify = () => toast.info("Password not match");
      notify()
      return
    }
  }

  return (
      <Container>
        <Wrapper>
          <Title>EDIT ACCOUNT PASSWORD</Title>
          <Form onSubmit={handleEditPassword} >
            <Input type="password" name="newpassword" placeholder="new password" />
            <Input type="password" name="confirmpassword" placeholder="confirm new password" />
            <Button style={{"margin-top":"40px"}} type="submit" > Confirm New Password </Button> <Button style={{"margin-top":"40px","margin-left":"40px"}} onClick={()=>{navigate('/profile')}}>Cencel</Button>
          </Form>
        </Wrapper>
      </Container>
  );
};

export default ForgetPassword;
