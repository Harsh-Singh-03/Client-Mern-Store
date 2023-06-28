import { AppBar, Toolbar, Box, Typography, styled } from  "@mui/material";
import Search from "./Search"; 
import Buttons from "./Buttons";
import { Link } from "react-router-dom";
import './Nav.css'

const StyledHeader = styled(AppBar)`
background: #2874f0;
box-shadow: none;
height: 55px;
` 
const Boxwrap = styled(Box)`
    margin-left: 11.6%;
    line-height: 0;
` 
const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
` 
const Plusimg = styled('img')({
    height: '10px',
    width: '10px',
    transform: 'translateY(-2px)',
    marginLeft: "2px"
})


const Nav = () => {
    const logoUrl = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png'
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';
  return (
     <StyledHeader>
        <Toolbar style={{minHeight: "55px"}}>
            <Boxwrap>
                <Link to='/'><img src={logoUrl} alt="logo" style={{width: "75px"}} /></Link>
                <Box style={{display: "flex", alignItems: "center"}}>
                    <SubHeading>Explore 
                       <Box component="span" style={{color: "#ffe500", fontWeight: 600, fontStyle: "italic"}}> Plus </Box>
                    </SubHeading>
                    <Plusimg src={subURL} alt="icon" />
                </Box>
            </Boxwrap>
            <Search/>
            <Box>
                <Buttons/>
            </Box>
        </Toolbar>
     </StyledHeader>
  )
}

export default Nav
