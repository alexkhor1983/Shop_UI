import React, {useEffect, useRef, useState} from "react";
import { Col, Row, Card, Form, Button } from '@themesberg/react-bootstrap';
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import {toast} from "react-toastify";
import {nanoid} from "@reduxjs/toolkit";
import Image from "react-bootstrap/Image";
import "../../../scss/volt.scss"
import constant from "../../../components/constant/constant.json"
import {getProfileInfo, ModifyProfileInfo} from "../../../components/api/axios";
import jwt_decode from "jwt-decode";
import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../../../components/User/navbar/Navbar";

const EditProfileForm = () => {

  const [imageUpload,setImageUpload] = useState('')
  const[fileTypeUpload,setFileTypeUpload] = useState('')
  const [preview, setPreview] = useState();
  const fileInputRef = useRef()
  const [imageChanges,setImageChanges] = useState(false)

  const [username,setUsername] = useState("")
  let [phoneNum,setPhoneNum] = useState("")
  const [email,setEmail] = useState("")
  const [originalProfileImg,setOriginalProfileImg] = useState("")

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let decodedToken = "";
  let temp = ""
  const [didInit,setDidInit] = useState(false)

  const target = {Bucket:"holaclothes-ecommerce-bucket" ,Key:nanoid() + fileTypeUpload.replace("image/","."), Body: imageUpload}
  const credentials = {accessKeyId: constant.S3_Access_key, secretAccessKey: constant.S3_Secret_key}

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (imageChanges) {
      try {
        const parallelUploads3 = new Upload({
          client: new S3Client({region: "ap-southeast-1", credentials}) || new S3({
            region: "ap-southeast-1",
            credentials
          }), // if the name of key value pair same, put one will represent -> {credentials : credentials}
          leavePartsOnError: false,
          params: target,
        })
        await parallelUploads3.done().then(result => {
          temp = result.Location
          const notify = () => toast.success("Image uploaded to server");
          notify()
        });
      } catch (err) {
        console.log(err);
        const notify = () => toast.error("image file cannot upload to server");
        notify()
        return
      }
    }
    ModifyProfileInfo(imageChanges ? {username, email, phoneNum, profileImg: temp} : {username, email, phoneNum, profileImg : originalProfileImg}).then(res => {
      console.log(res)
      const notify = () => toast.success(res);
      notify()
      return
    }).catch(err => {
      console.log(err)
      const notify = () => toast.error(err.message);
      notify()
      return
    })
  }

  useEffect(() => {
    if(!didInit){
    try {
      decodedToken = jwt_decode(token); // validate jwt format
    } catch (error) {
      localStorage.setItem("token", "");
      const notify = () => toast.error("Token Invalid");
      notify()
      navigate('/login')
      return
    }

    let currentDate = new Date();

    // JWT exp is in seconds, and default 24 hour in backend passed jwt token
    if (decodedToken.exp * 86400 < currentDate.getTime()) {
      localStorage.setItem("token", "");
      const notify = () => toast.error("Token Expired");
      notify()
      navigate('/login')
      return
      }

      (async () => {
        await getProfileInfo(decodedToken).then( res => {
          setPreview(res?.profileImg)
          setOriginalProfileImg(res?.profileImg)
          setUsername(res?.username)
          setPhoneNum(res?.phoneNum)
          setEmail(res?.email)
        }).catch(err => {
          const notify = () => toast.error(err.message);
          notify()
          return
        })
      })()
      setDidInit(true)
    }
    if (imageUpload) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(imageUpload);
      } else {
        setPreview(null);
      }
  }, [imageUpload]);

  return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Navbar />
        <Card.Body>
          <h5 className="mb-4">Profile information</h5>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="Username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={username} readOnly={true}/>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="profileImg">
                  <Form.Label>Profile Image</Form.Label>

                  <Form.Group>
                    <Image width="200" height="200" style={{"display": "block","margin-left": "auto","margin-right": "auto","marginBottom" : "20px","marginTop" : "20px"}}
                           src={preview} roundedCircle />
                  </Form.Group>
                  <Form.Control type="file" ref={fileInputRef}
                                accept=" image/png, image/jpeg , image/svg "
                                onChange={(event) => {
                                  const file = event.target.files[0];
                                  if (file !== '' && file.type.substr(0, 5) === "image") {
                                    setImageChanges(true);
                                    setImageUpload(file);
                                    setFileTypeUpload(file.type);
                                  }
                                }} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control required type="email" readOnly={true} value={email} />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" value={phoneNum} pattern="^(01)[02-46-9]-*[0-9]{7}$|^(01)[1]-*[0-9]{8}$" placeholder="eg. 01X-XXXXXXXX" onChange={(e)=>{setPhoneNum(e.target.value)}} required />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3">
              <Button variant="primary" type="submit">Save All</Button> <Button variant="primary" style={{"margin-left":"20px"}} onClick={()=>{navigate('/Profile')}} type="cancel">Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
  );
};

export default EditProfileForm;
