import { Box, Button, CircularProgress, Typography, styled } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthDisplay } from '../../Actions/UserAction';
import ProfileBtn from './ProfileBtn';
import { ToggleCartPage } from '../../Actions/CartAction';
import { useAlert } from 'react-alert';

const LoginButton = styled(Button)`
  background: #fff;
  color: #2874f0;
  width: auto;
  height: auto;
  padding: 3px 40px;
  font-size: 14px;
  text-transform: none;
  font-weight: 600;
  margin: 0px 45px;
  border-radius: 2px;
`;

const Wrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin: 0 3% 0 auto;
  & > p, & > div {
    margin-right: 40px;
    letter-spacing: 0.01rem;
  }
`;
const Carticon = styled(ShoppingCartIcon)`
  height: 25px;
  transform: translateY(2px);
  margin-right: 4px;
`;


const Buttons = () => {
  const Dispatch = useDispatch()
  const AlertMessage = useAlert()
  const { isLoggedIn, loading } = useSelector((state) => state.TokenVerify);

  const ToggleFormDisplay = () => {
    Dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY"))
  }
  const showPopUp = () =>{
    if(isLoggedIn === true){
      Dispatch(ToggleCartPage("CART_OPEN"))
    }else{
      Dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY"))
    }
  }
  return (
    <Wrapper>
      {loading === true ?  <CircularProgress color="inherit" style={{padding: "3px 40px", width: "30px", height: 30}} /> :
      isLoggedIn === false ?
        <LoginButton variant="contained" onClick={ToggleFormDisplay}>Login</LoginButton> :
        <ProfileBtn/>
      }
      <Typography style={{ minWidth: "max-content",cursor: "pointer" }} onClick={()=>AlertMessage.info("Coming Soon !")}>Become a Seller</Typography>
      <Typography onClick={()=>AlertMessage.info("Coming Soon !")} style={{cursor: "pointer"}}>More</Typography>
      <Box style={{ display: "flex", alignItems: "center", cursor: "pointer"  }} onClick={showPopUp} >
        <Typography>
          <Carticon />
        </Typography>
        <Typography>Cart</Typography>
      </Box>
    </Wrapper>
  )
}

export default Buttons
