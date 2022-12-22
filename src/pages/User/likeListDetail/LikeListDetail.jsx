import React, {useEffect, useState} from "react";
import Select from 'react-select';
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Add, Favorite, FavoriteBorderOutlined, Remove, Search} from "@material-ui/icons";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import {getOptionsById, getProductsById} from "../../../components/api/axios";
import Announcement from "../../../components/User/announcement/Announcement";
import Footer from "../../../components/User/footer/Footer";
import Navbar from "../../../components/User/navbar/Navbar";
import { mobile } from "../../../responsive";
import {addToCart} from "../../../cartSlice";
import Rating from '@mui/material/Rating';
import {toast} from "react-toastify";

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

const ProductDetail = () => {

  const { productId } = useParams()
  const dispatch = useDispatch()
  const Navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null)
  const [cartQuantity,setCartQuantity] = useState(1)
  const [product, setProduct] = useState()
  const [options,setOptions] = useState([])
  const [rating,setRating] = useState(0)

  useEffect(() => {
    (async () => {
      const res = await getProductsById(productId)
      const option = await getOptionsById(productId)

      const result = []

      console.log(res)
      console.log(option)

      for (let i=0; i< option?.length; i++) { //loop for the options that shows at react-select component
        result[i] = {
          value : option[i].optionName , label : option[i].optionName
        }
      }
      setProduct(res)
      setOptions(result)
      setRating(res?.avgRating)
    })()
  }, [])

  const [itemLike,setItemLike] = useState(product?.likes);
  const likesProduct = (id) => {
    if (!localStorage.getItem('token')){
      alert('Have to login before like the product')
      Navigate("/Login");
      return
    }
    // axios request and refresh the page
    setItemLike(itemLike => !itemLike);
    console.log("Likes the product id = " + id);
  }

  const unlikeProduct = (id) => {
    // axios request and refresh the page
    setItemLike(itemLike => !itemLike);
    console.log("Unlike the product id = " + id);
  }

  const handleAddToCart = () => {
    if(selectedOption === null){
      const notify = () => toast.error("Please Select Size");
      notify()
      return
    }
    dispatch(addToCart({productId:product?.productId , productName:product?.productName , productImg:product?.productImg ,productPrice:product?.productPrice,
      option:selectedOption,cartQuantity:cartQuantity}))
  }

  const handleDecreaseQuantity = () => {
    if(cartQuantity > 1){
      setCartQuantity(cartQuantity.valueOf() -1 )
    }
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
          <Title><Rating name="read-only" value={rating} readOnly /></Title>
          <Title>{itemLike && localStorage.getItem("token") ? <Favorite color="error" onClick={() => unlikeProduct(product?.productId)}/> : <FavoriteBorderOutlined onClick={ () => likesProduct(product?.productId) } /> }</Title>
          <Title>Seller : {product?.userName}</Title>
          <Desc>
            {product?.productDesc}
          </Desc>
          <Price>RM {product?.productPrice}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <Select
                  onChange={select => setSelectedOption(select.value)}
                  options={options}
              />
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={handleDecreaseQuantity}/>
              <Amount>{cartQuantity}</Amount>
              <Add onClick={() => setCartQuantity(cartQuantity.valueOf() + 1)}/>
            </AmountContainer>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default ProductDetail;
