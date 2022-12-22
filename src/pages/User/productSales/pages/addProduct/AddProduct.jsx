import React, {useEffect, useRef, useState} from 'react'
import "./AddProduct.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {createProductForSale, ModifyProductInfo} from '../../../../../components/api/axios'
import jwt_decode from "jwt-decode";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {nanoid} from "@reduxjs/toolkit";
import constant from "../../../../../components/constant/constant.json";
import {Upload} from "@aws-sdk/lib-storage";
import {S3, S3Client} from "@aws-sdk/client-s3";
import Image from "react-bootstrap/Image";

export default function AddProduct() {

  const [imageUpload,setImageUpload] = useState('')
  const[fileTypeUpload,setFileTypeUpload] = useState('')
  const [preview, setPreview] = useState();
  const fileInputRef = useRef()
  const [imageChanges,setImageChanges] = useState(false)
  let temp;
  const [didInit,setDidInit] = useState(false)

  const target = {Bucket:"holaclothes-ecommerce-bucket" ,Key:nanoid() + fileTypeUpload.replace("image/","."), Body: imageUpload}
  const credentials = {accessKeyId: constant.S3_Access_key, secretAccessKey: constant.S3_Secret_key}

  const productSpecificationModels = []

  const [checkedS, setCheckedS] = useState(false);
  const [checkedM, setCheckedM] = useState(false);
  const [checkedL, setCheckedL] = useState(false);
  const [checkedXL, setCheckedXL] = useState(false);
  const [checkedXXL, setCheckedXXL] = useState(false);

  const [quantityS, setQuantityS] = useState(0);
  const [quantityM, setQuantityM] = useState(0);
  const [quantityL, setQuantityL] = useState(0);
  const [quantityXL, setQuantityXL] = useState(0);
  const [quantityXXL, setQuantityXXL] = useState(0);

  let navigate = useNavigate();

  useEffect(()=>{

    if(!didInit) {
      const token = localStorage.getItem('token');
      let decodedToken = "";

      try {
        jwt_decode(token); // validate jwt format
      } catch (error) {
        localStorage.setItem("token", "");
        const notify = () => toast.error("Token Invalid");
        notify()
        navigate("/Login");
      }

      let currentDate = new Date();

      // JWT exp is in seconds, and default 24 hour in backend passed jwt token
      if (decodedToken.exp * 86400 < currentDate.getTime()) {
        localStorage.setItem("token", "");
        const notify = () => toast.error("Token Expired");
        notify()
        navigate("/Login");
      }
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
    },[imageUpload])

  const handleSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedS(event.target.checked);
  };

  const handleMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedM(event.target.checked);
  };

  const handleLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedL(event.target.checked);
  };

  const handleXLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedXL(event.target.checked);
  };

  const handleXXLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedXXL(event.target.checked);
  };

  const handleQuantityS = event => {
    setQuantityS(event.target.value);
  };

  const handleQuantityM = event => {
    setQuantityM(event.target.value);
  };

  const handleQuantityL = event => {
    setQuantityL(event.target.value);
  };

  const handleQuantityXL = event => {
    setQuantityXL(event.target.value);
  };

  const handleQuantityXXL = event => {
    setQuantityXXL(event.target.value);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    //"productName": e.target.productName.value , "productPrice": e.target.productPrice.value, "productDesc": e.target.productDesc.value, "productImage": imageChanges?temp:"", "productDiscount": e.target.productDiscount.value, "productEnabled": e.target.productEnabled.value, "category": e.target.category.value , productSpecificationModels
    if(e.target.productName.value == ""){
      const notify = () => toast.error("Product name should not be empty");
      notify()
      return
    }

    if(e.target.productPrice.value <= 0){
      const notify = () => toast.error("Product price should not be negative or zero");
      notify()
      return
    }

    if(e.target.productDesc.value == ""){
      const notify = () => toast.error("Product desc should not be empty");
      notify()
      return
    }

    if(e.target.productDiscount.value < 0 || e.target.productDiscount.value > 100){
      const notify = () => toast.error("Invalid discount");
      notify()
      return
    }

    if(!e.target.productEnabled.value === "true" || !e.target.productEnabled.value === "false"){
      const notify = () => toast.error("Invalid enabled type");
      notify()
      return
    }

    if(!e.target.category.value === "Blouse" || !e.target.category.value === "T-Shirt" || !e.target.category.value === "Jacket" || !e.target.category.value === "Skirt" || !e.target.category.value === "Shorts" || !e.target.category.value === "Jeans" || !e.target.category.value === "Formal Wear" ){
      const notify = () => toast.error("Invalid category");
      notify()
      return
    }

    if(!(checkedS || checkedM || checkedL || checkedXL || checkedXXL)){
      const notify = () => toast.error("At least one specification have to choose");
      notify()
      return
    }

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
    //if check for options to array
    if (checkedS){
      productSpecificationModels.push({
        "quantity": quantityS?quantityS:0,
        "specification": "S"
      })
    }if(checkedM){
      productSpecificationModels.push({
        "quantity": quantityM?quantityM:0,
        "specification": "M"
      })
    }if(checkedL) {
      productSpecificationModels.push({
        "quantity": quantityL?quantityL:0,
        "specification": "L"
      })
    }if(checkedXL){
      productSpecificationModels.push({
        "quantity": quantityXL?quantityXL:0,
        "specification": "XL"
      })
    }if(checkedXXL){
      productSpecificationModels.push({
        "quantity": quantityXXL?quantityXXL:0,
        "specification": "XXL"
      })
    }

      createProductForSale({"productName": e.target.productName.value , "productPrice": e.target.productPrice.value, "productDesc": e.target.productDesc.value, "productImage": imageChanges?temp:"", "productDiscount": e.target.productDiscount.value, "productEnabled": e.target.productEnabled.value, "category": e.target.category.value , productSpecificationModels }).then(() => {
        const notify = () => toast.success("Product added to database");
        notify()
        navigate("/myProduct")
        return
      }).catch(err => {
        console.log(err.message)
        const notify = () => toast.error("Product creation failed");
        notify()
        return
      })
  }

  return (
  <div className="newProduct">

    <form className="addProductForm" onSubmit={handleEditSubmit}>
  <div className="topContainer">
    <div className="formAddProduct">
      <div className="containerForm">
        <div className="title">Add Product Detail</div>
        <div className="contents">
          <div className="user-details">
            <Container>
              <Row>

                <Col>
                  <div className="addProductItem">
                    <label>Product Image</label>
                    <Image width="200" height="200" style={{"display": "block","margin-left": "auto","margin-right": "auto","marginBottom" : "20px","marginTop" : "20px"}}
                           src={preview} roundedCircle />
                    <input type="file" ref={fileInputRef}
                            accept=" image/png, image/jpeg , image/svg "
                            onChange={(event) => {
                              const file = event.target.files[0];
                              if (file !== '' && file.type.substr(0, 5) === "image") {
                                setImageChanges(true);
                                setImageUpload(file);
                                setFileTypeUpload(file.type);
                              }
                            }} />
                  </div>
                </Col>

                <Col>
                  <label>Specification</label>
                  <div className="addProductItem">
                    <List>
                      <ListItem alignItems="center">
                        S<Checkbox
                          checked={checkedS}
                          onChange={handleSChange}
                          inputProps={{ "aria-label": "primary checkbox" }}
                      />
                        <TextField
                            type="number"
                            fullWidth
                            onChange={handleQuantityS}
                            disabled={!checkedS}
                            label="quantity"
                        />
                      </ListItem>

                      <ListItem alignItems="center">
                        M<Checkbox
                          checked={checkedM}
                          onChange={handleMChange}
                          inputProps={{ "aria-label": "secondary checkbox" }}
                      />
                        <TextField
                            type="number"
                            fullWidth
                            onChange={handleQuantityM}
                            disabled={!checkedM}
                            label="quantity"
                        />
                      </ListItem>

                      <ListItem alignItems="center">
                        L<Checkbox
                          checked={checkedL}
                          onChange={handleLChange}
                          inputProps={{ "aria-label": "primary checkbox" }}
                      />
                        <TextField
                            type="number"
                            fullWidth
                            onChange={handleQuantityL}
                            disabled={!checkedL}
                            label="quantity"
                        />
                      </ListItem>

                      <ListItem alignItems="center">
                        XL<Checkbox
                          checked={checkedXL}
                          onChange={handleXLChange}
                          inputProps={{ "aria-label": "primary checkbox" }}
                      />
                        <TextField
                            type="number"
                            fullWidth
                            onChange={handleQuantityXL}
                            disabled={!checkedXL}
                            min={0}
                            label="quantity"
                        />
                      </ListItem>

                      <ListItem alignItems="center">
                        XXL<Checkbox
                          checked={checkedXXL}
                          onChange={handleXXLChange}
                          inputProps={{ "aria-label": "primary checkbox" }}
                      />
                        <TextField
                            type="number"
                            fullWidth
                            onChange={handleQuantityXXL}
                            disabled={!checkedXXL}
                            label="quantity"
                        />
                      </ListItem>
                    </List>

                  </div>
                </Col>

              </Row>

              <Row>

                <Col>
                  <div className="addProductItem">
                    <label>Discount</label>
                    <input max={100} min={0}  type="number" name="productDiscount" placeholder="0-100" required/>
                  </div>
                </Col>

                <Col>
                  <div className="addProductItem">
                    <label>Product Desc</label>
                    <input type="text" name="productDesc" placeholder="Desc" required/>
                  </div>
                </Col>

                <Col>
                  <div className="addProductItem">
                    <label>Product Enabled</label>
                    <select name="productEnabled" id="active" required>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </Col>

                <Col>
                  <div className="addProductItem">
                    <label>Product Category</label>
                    <select name="category" id="category" required >
                      <option value="Blouse">Blouse</option>
                      <option value="T-Shirt">T-Shirt</option>
                      <option value="Jacket">Jacket</option>
                      <option value="Skirt">Skirt</option>
                      <option value="Shorts">Shorts</option>
                      <option value="Jeans">Jeans</option>
                      <option value="Formal Wear">Formal Wear</option>
                    </select>
                  </div>
                </Col>

                <Col>
                  <div className="addProductItem">
                    <label>Product Price</label>
                    <input min={1} type="text" pattern="^\d*(\.\d{0,2})?$" name="productPrice" placeholder="Price" required />
                  </div>
                </Col>

                <Col>
                  <div className="addProductItem">
                    <label>Name</label>
                    <input type="text" name="productName" placeholder="Clothes Name" required/>
                  </div>
                </Col>

              </Row>
            </Container>
          </div>
          <div className="button">
            <input type="submit" value="Add Product Detail"/>
          </div>
        </div>
      </div>
    </div>
  </div>
    </form>
  </div>
  );
}
