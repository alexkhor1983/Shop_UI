import React, {useEffect, useState} from "react";
import { Card} from '@themesberg/react-bootstrap';
import "../../../scss/volt.scss"
import Navbar from "../../../components/User/navbar/Navbar";
import styled from "styled-components";
import {getProfileInfo} from "../../../components/api/axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import async from "async";


const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  width: 200px;
  align-self: center;
  &:hover{
      background-color: #f8f4f4;
  }
`;

export default function Profile() {

  const navigate = useNavigate();

  const [username,setUsername] = useState("")
  const [phoneNum,setPhoneNum] = useState("")
  const [email,setEmail] = useState("")
  const [profileImg,setProfileImg] = useState("")
  const [informationUpdated,setInformationUpdated] = useState(false)

  useEffect( async () => {
    console.log("useEffect called -> result before")
    console.log(phoneNum)
    console.log(email)
    setPhoneNum("")
    setEmail("")
    setProfileImg("")
    setUsername("")

    await getProfileInfo().then(res => {
      setPhoneNum(res?.phoneNum)
      setEmail(res?.email)
      setProfileImg(res?.profileImg)
      setUsername(res?.username)
      setInformationUpdated(true)
    }).catch(err => {
          console.log(err)
          const notify = () => toast.error("Bad Credentials or Server Error Occur");
          notify()
          return
        }
    )
  },[informationUpdated])

  const handleEditProfile = () => {
    navigate('/EditProfile')
  }

  return (
<div>
  <Navbar />
  <Card border="light" className="text-center p-0 mb-4">
    <div style={{ backgroundImage: `url("https://images-cdn.welcomesoftware.com/Zz0zZTliMjQ4MzhlNGExMWViYmJiMjFiZTI2ZWNmN2MzZA==")` }} className="profile-cover rounded-top" />
    <Card.Body className="pb-5">
      <Card.Img src={profileImg} alt="Profile Img" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
      <Card.Title>{username}</Card.Title>
      <Card.Subtitle className="fw-normal">{email}</Card.Subtitle>
      <Card.Text className="text-gray mb-4">{phoneNum}</Card.Text>
    </Card.Body>
    <Button className="button" onClick={handleEditProfile}>Edit Profile</Button>
    <Button style={{"margin-top":"20px"}} onClick={()=>{navigate('/EditPassword')}}>Edit Password</Button>
  </Card>
</div>
  );
}
