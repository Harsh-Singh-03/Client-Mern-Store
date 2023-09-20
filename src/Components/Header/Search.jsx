
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Box, styled, Card } from '@mui/material';
import { useState } from 'react';
import { navData } from '../DummyData/data';
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';


const SearchContainer = styled(Box)`
  border-radius: 1px;
  margin-left: 12px;
  width: 100%;
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
    const [toggleDisplay, setToggleDisplay] = useState("none")
    const [CatData, setCatData] = useState([])
    const [inputVal, setinputVal] = useState("")
    const Navigate = useNavigate()
    // const { loading, products } = useSelector((state) => state.products);
    
    const handleChange = (e) =>{
      console.log(e.target.value)
      setinputVal(e.target.value)
      if(e.target.value !== ""){
        setToggleDisplay("grid")
      }else{
        setToggleDisplay("none")
      }
      let tempData =[]
      // let tempData2 =[]
      navData.forEach(nav=>{
        if(nav.text.includes(e.target.value)){
          tempData.push(nav)
        }
      })
      setCatData(tempData)
    }
    const redirect = (e) =>{
      e.preventDefault()
      Navigate(`/search?search=${inputVal}`)
    }

    return (
      <div className='search-box'>
          <form onSubmit={redirect} style={{width: "100%"}}>
            <SearchContainer>
                <InputSearchBase id='dummy'
                  placeholder="Search for products, categories and more"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleChange}
                />
                <SearchIconWrapper onClick={redirect}>
                  <SearchIcon />
                </SearchIconWrapper>
            </SearchContainer>
          </form>
        <Card className='search-card' style={{display: toggleDisplay}}>
          <div className='cat-list'>
            <h4>Category :</h4>
            <ul>
              {CatData.length > 0 ? CatData.map((item, index)=>{
                return (
                  <li key={index}><Link to={item.link}>{item.text}</Link></li>
                )
              }): <span>No Categories Found</span>}
            </ul>
          </div>
          {/* <div className='cat-list'>
            <h4>Products :</h4>
            <ul>
              {CatData.length > 0 ? CatData.map((item, index)=>{
                return (
                  <li key={index}><Link to={item.link}>{item.text}</Link></li>
                )
              }): <span>No Products Found</span>}
            </ul>
          </div> */}
        </Card>
      </div>
    )
}

export default Search;