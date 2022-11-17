import styled from "styled-components";
import Product from "../product/Product";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`;

const Products = ({searchResults,category}) => {
  let results = [];
  let filteredCategoryProducts = [];

  if (searchResults){
    if(category === 'All'){
      results = searchResults.map(item => <Product item={item} key={item.id} />)
    }else{
      filteredCategoryProducts = searchResults.filter(searchResults => searchResults.category === category)
      results = filteredCategoryProducts.map(item => <Product item={item} key={item.id} />)
    }
  }
  const content = results?.length ? results : <p style={{width: '100%',' align-items': 'center'}}>No Matching Products</p>
      return (
        <Container>
        {content}
        </Container>
  )
}

export default Products;
