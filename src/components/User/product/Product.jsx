import { useNavigate } from "react-router-dom";
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    Favorite
} from "@material-ui/icons";
import styled from "styled-components";
import {Link, Navigate} from "react-router-dom";
import {useState} from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Container = styled.div`
  flex: 1;
  margin: 5px;
  
  height: 350px;
  min-width: 280px;
  
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  display: flex;
  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({item}) => {
    const [itemLike,setItemLike] = useState(item.likes);
    let navigate = useNavigate();
    const likesProduct = (id) => {
        if (!localStorage.getItem('user_id')){
            alert('Have to login before like the product')
            navigate("/Login");
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

    return (
        <Container>
            <Circle/>
            <Image src={item.img}/>
            <Info>
                <Icon>
                    <Link to={`/ProductDetail/${item.id}`}>
                        <SearchOutlined/>
                    </Link>
                </Icon>
                <Icon>
                    {itemLike && localStorage.getItem("user_id") ? <Favorite color="error" onClick={() => unlikeProduct(item.id)}/> : <FavoriteBorderOutlined onClick={ () => likesProduct(item.id) } /> }
                </Icon>
            </Info>
        </Container>
    );
};

export default Product;
