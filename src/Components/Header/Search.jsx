
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Box, styled } from '@mui/material';


const SearchContainer = styled(Box)`
  border-radius: 1px;
  margin-left: 12px;
  width: 38%;
  height: 36px;
  background-color: #fff;
  display: flex;
`;

const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  padding-right: 10px;
  font-size: 30px;
  display: flex;
  color: #2874F1;
`;
const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 17px;
  font-size: 14px;
  padding-top: 2px;
`;

const Search = () => {

    return (
        <SearchContainer>
            <InputSearchBase id='dummy'
              placeholder="Search for products, brands and more"
              inputProps={{ 'aria-label': 'search' }}
            />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
        </SearchContainer>
    )
}

export default Search;