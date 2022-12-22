import React from 'react'
import styled from "styled-components";
import { mobile } from "../../../responsive";
import {toast} from "react-toastify";
import {sendRegistrationRequest} from "../../../components/api/axios";
import {useNavigate} from "react-router-dom";

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

const Register = () => {
  const navigate = useNavigate();
  const handleRegistration = e => {
    e.preventDefault()
    if(!(e.target.password.value === e.target.confirmPassword.value)){
      const notify = () => toast.info("password and confirm password not match");
      notify()
      return
    }
    sendRegistrationRequest({
      "username": e.target.username.value,
      "password": e.target.password.value,
      "phoneNum": e.target.phoneNum.value,
      "email": e.target.email.value
    }).then( () => {
      const notify = () => toast.info("Account Created, and verification is send to email. Please note that account still cannot login, need to pass verification");
      notify()
      navigate("/login")
      return
    }).catch( err => {
      const notify = () => toast.info(err.message);
      notify()
      return
    })
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleRegistration}>
          <Input name ="username" placeholder="username" />
          <Input name ="email" placeholder="email" type="text" required/>
          <Input name ="phoneNum" placeholder="phone" type="text" pattern="^(01)[02-46-9]-*[0-9]{7}$|^(01)[1]-*[0-9]{8}$" required/>
          <Input name ="password" placeholder="password" type="password" />
          <Input name ="confirmPassword" placeholder="confirm password" type="password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
