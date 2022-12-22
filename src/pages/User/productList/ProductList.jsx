import React from 'react'
import styled from "styled-components";
import Navbar from "../../../components/User/navbar/Navbar";
import Announcement from "../../../components/User/announcement/Announcement";
import Footer from "../../../components/User/footer/Footer";
import { mobile } from "../../../responsive";
import {useEffect, useState} from 'react'
import {getProducts} from '../../../components/api/axios'
import SearchBar from '../../../components/searchBar/searchBar'
import Products from "../../../components/User/products/Products";
import jwt_decode from "jwt-decode";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ max_width: '60px' })}
`;

const ProductContainer = styled.div`
    text-align: center;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const ProductList = () => {
    const[products,setProducts] = useState([]);
    const[searchResults, setSearchResults] = useState([]);
    const[category,setCategory] = useState('');
    const token = localStorage.getItem('token');


    useEffect(()=>{
        getProducts().then(json => {
            if(token){
                let decodedToken = jwt_decode(token);
                let filteredProductList = json.filter( ({userName}) => !userName.match(decodedToken.sub));
                setProducts(filteredProductList)
                setSearchResults(filteredProductList)
            }else{
                setProducts(json)
                setSearchResults(json)
            }
        })
        setCategory('All')
    },[])
    //included just place it empty array [] the whole component only will run one time for useEffect()
    //deps variable is necessary to be used, if not it will be like infinity loop, keep performing until computer cannot handle

    const handleChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    return (
    <Container>
      <Navbar />
      <Announcement />
      <Title style={{"text-align": "center"}}>Product List</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products Category:</FilterText>
          <Select onChange={handleChangeCategory} >
              <Option >All</Option>
              <Option>Blouse</Option>
              <Option>T-Shirt</Option>
              <Option>Jacket</Option>
              <Option>Skirt</Option>
              <Option>Shorts</Option>
              <Option>Jeans</Option>
              <Option>Formal Wear</Option>
          </Select>
        </Filter>
        <Filter>
            <SearchBar products={products} setSearchResults={setSearchResults} />
        </Filter>
      </FilterContainer>
      <ProductContainer>
        <Products searchResults={searchResults} category={category}/>
      </ProductContainer>
      <Footer />
    </Container>
  );
};

export default ProductList;
