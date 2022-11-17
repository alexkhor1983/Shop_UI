import styled from "styled-components";
import {mobile} from "../../responsive";

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const SearchBar = ({products , setSearchResults}) => {

    const handleSearchChange = (e) => {
        if(!e.target.value) return setSearchResults(products)

        let resultArray = ''
        resultArray = products.filter(products => products.productName.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchResults(resultArray)
    }

    return (
        <SearchContainer >
                <input
                    style={{border: 'none','padding-top' : '5px','font-size': '18px'}}
                    className="search__input"
                    type="text"
                    id="search"
                    placeholder= "Enter Product Name"
                    onChange={handleSearchChange}
                />
        </SearchContainer>
    )
}

export default SearchBar;
