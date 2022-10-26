import styled from "styled-components";
import Navbar from "../../../components/User/navbar/Navbar";
import Announcement from "../../../components/User/announcement/Announcement";
import Products from "../../../components/User/products/Products";
import Footer from "../../../components/User/footer/Footer";
import { mobile } from "../../../responsive";
import {Search} from "@material-ui/icons";

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
  ${mobile({ max_width: "40px" })}
`;

const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
        {/*  <FilterText>Sort Products:</FilterText>*/}
        {/*  <Select>*/}
        {/*    <Option selected>Newest</Option>*/}
        {/*    <Option>Price (asc)</Option>*/}
        {/*    <Option>Price (desc)</Option>*/}
        {/*  </Select>*/}
            <SearchContainer>
                <Input placeholder="Search" />
                <Search style={{ color: "gray", fontSize: 16 }} />
            </SearchContainer>
        </Filter>
      </FilterContainer>
      <Products />
      <Footer />
    </Container>
  );
};

export default ProductList;
