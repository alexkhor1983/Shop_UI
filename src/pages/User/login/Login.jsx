import React from 'react'
import styled from "styled-components";
import {mobile} from "../../../responsive";
import Navbar from "../../../components/User/navbar/Navbar";
import {Link, useNavigate} from "react-router-dom";
import {sendLoginInfo} from "../../../components/api/axios";
import {toast} from "react-toastify";
import jwt_decode from "jwt-decode";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Login = () => {
  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    sendLoginInfo({username,password}).then(res => {
      localStorage.setItem("token", res.accessToken);
      const notify = () => toast.success("Login Success");
      notify()
      let decodedToken = jwt_decode(res.accessToken)
      if(decodedToken?.roles === "ROLE_USER"){
        Navigate("/")
      }else{
        Navigate("/admin")
      }

      return
    }).catch( err => {
      const notify = () => toast.error(err.message);
      notify()
      return
    })
  }
  return (
     <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input name="username" placeholder="username" />
          <Input name="password" placeholder="password" type="password"/>
          <Button>LOGIN</Button>
          <Link style={{"margin": "5px 0px", "font-size" : "12px","text-decoration": "underline", "cursor": "pointer"}} to="/forgetPassword">NOT REMEMBER THE PASSWORD?</Link>
          <Link style={{"margin": "5px 0px", "font-size" : "12px","text-decoration": "underline", "cursor": "pointer"}} to="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
