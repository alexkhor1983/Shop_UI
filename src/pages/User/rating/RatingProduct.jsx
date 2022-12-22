import React, {useEffect, useState} from "react";
import Select from 'react-select';
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Add, Favorite, FavoriteBorderOutlined, Remove, Search} from "@material-ui/icons";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import {
  checkIsLike,
  createOrRemoveLikeList,
  getOptionsById,
  getProductDetailByOrderId,
  getProductsById, ratingOrder
} from "../../../components/api/axios";
import Announcement from "../../../components/User/announcement/Announcement";
import Footer from "../../../components/User/footer/Footer";
import Navbar from "../../../components/User/navbar/Navbar";
import { mobile } from "../../../responsive";
import {addToCart} from "../../../cartSlice";
import Rating from '@mui/material/Rating';
import {toast} from "react-toastify";
import jwt_decode from "jwt-decode";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  padding-right: 20px
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const RatingProduct = () => {

  const { orderId } = useParams()
  const Navigate = useNavigate();
  const [product, setProduct] = useState()
  const [rating,setRating] = useState(0)

  useEffect(() => {
    (async () => {
      const res = await getProductDetailByOrderId(orderId)
      setProduct(res)
    })()
  }, [])

  const handleClickRating = () => {
    ratingOrder(orderId,rating).then(() => {
      const notify = () => toast.success("order rated");
      notify()
      Navigate("/transaction")
      return
    }).catch((err)=>{
      const notify = () => toast.error(err.message);
      notify()
      return
    })
  }

  return (
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <ImgContainer>
            <Image src={product?.productImg} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product?.productName}</Title>
            <Title><Rating name="read-only" value={rating} onChange={(event, newValue) => setRating(newValue)} /></Title>
            <Title>Seller : {product?.userName}</Title>
            <Desc>
              {product?.productDesc}
            </Desc>
            <Price>RM {product?.productPrice}</Price>
            <FilterContainer>
            </FilterContainer>
            <AddContainer>
              <Button onClick={handleClickRating}>Save rating</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Footer />
      </Container>
  );
};

export default RatingProduct;
