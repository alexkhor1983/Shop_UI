import React from 'react';
import {useSelector,useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../../../components/User/announcement/Announcement";
import Footer from "../../../components/User/footer/Footer";
import Navbar from "../../../components/User/navbar/Navbar";
import { mobile } from "../../../responsive";
import {useEffect, useState} from "react";
import {increaseCartQuantity, decreaseCartQuantity, getTotals} from "../../../cartSlice";
import {checkOut, getLikeListNumber} from "../../../components/api/axios";
import {toast} from "react-toastify";
import jwt_decode from "jwt-decode";
import async from "async";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "30px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const confirm = useConfirm();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  let token = localStorage.getItem("token");
  const [countLikes,setCountLikes] = useState(0);

  const handleAddCartQuantity = (cartItem) => {
    dispatch(increaseCartQuantity({productId:cartItem.productId,option:cartItem.option}))
  }

  const handleMinusCartQuantity = (cartItem) => {
    if(cartItem?.cartQuantity === 1){
      confirm({ description: `This will remove the cart name : ${cartItem.productName}, option : ${cartItem.option}` })
          .then(() => dispatch(decreaseCartQuantity({productId:cartItem.productId,option:cartItem.option})))
          .catch(() => console.log("Cart Remove Cancelled."));
    }else{
      dispatch(decreaseCartQuantity({productId:cartItem.productId,option:cartItem.option}))
    }
  }

  const handleCheckOut = () => {
    if (!localStorage.getItem('token')){
      alert('Have to login before checkout')
      Navigate("/Login");
      return
    }
    if (cart?.cartItems.length > 0) {
     checkOut(cart?.cartItems).then(res=>{
      window.location.href = res?.sessionUrl
      }).catch(err => {
        const notify = () => toast.error(err.message);
        notify()
        return
      })
    }else{
      const notify = () => toast.error("Please add product to cart before checkout");
      notify()
      return
    }
  }

  useEffect(()=>{
    dispatch(getTotals())
  },[cart,dispatch]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <Link to={'/productList'} style={{ textDecoration: 'none' }}>
          <TopButton >CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
          </TopTexts>
          <TopButton type="filled" onClick={()=>{handleCheckOut()}}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.cartItems.length === 0 ? (
                <p style={{width: '100%',height: '100%',display: 'flex','align-items': 'center','justify-content': 'center'}}>Cart is Currently Empty</p>
            ) : (
                cart.cartItems?.map((cartItem)=>(
                    <div>
                      <Product>
                        <ProductDetail>
                          <Image src={cartItem?.productImg} />
                          <Details>
                          <ProductName>
                            <b>Product:</b> {cartItem.productName}
                          </ProductName>
                          <ProductId>
                            <b>ID:</b> {cartItem.productId}
                          </ProductId>
                          <ProductSize>
                            <b>Size:</b> {cartItem.option}
                          </ProductSize>
                        </Details>
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <Add onClick={()=>{handleAddCartQuantity(cartItem)}}/>
                          <ProductAmount>{cartItem.cartQuantity}</ProductAmount>
                          <Remove onClick={()=>{handleMinusCartQuantity(cartItem)}}/>
                        </ProductAmountContainer>
                        <ProductPrice>RM {cartItem.productPrice}</ProductPrice>
                      </PriceDetail>
                    </Product>
                  <Hr/>
                </div>
                ))
            )}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem >
              <SummaryItemText>SubTotal</SummaryItemText>
              <SummaryItemPrice>RM {cart.cartTotalAmount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>RM {cart?.cartTotalAmount}</SummaryItemPrice>
            </SummaryItem>

            <Button onClick={()=>{handleCheckOut()}}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
