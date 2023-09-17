import './App.css';
import Home from './Components/Home/Home';
import { Box } from '@mui/material';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import Mainpage from './Components/Listpage/Mainpage';
import ProductDetail from './Components/Product-detail/Product-detail';
import Auth from './Components/Authentications/Auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TokenVerify } from './Actions/UserAction';
import Cart from './Components/Cart/Cart';
import Shipping from './Components/Checkout/Shipping';
import Thankyou from './Components/Checkout/Thankyou';
import Profile from './Components/User/Profile';
import VerifyEmail from './Components/User/VerifyEmail';
import Reset from './Components/Authentications/Reset';
import OrderInfo from './Components/User/OrderInfo';

function App() {
  
  const Dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.TokenVerify);
  const { CartView } = useSelector((state) => state.CartDisplay);
  // loading, UserData,

  useEffect(() => {
    if (!isLoggedIn) {
      Dispatch(TokenVerify())
    }
    // eslint-disable-next-line 
  }, [])
  useEffect(() => {
    if (CartView === true) {
      document.querySelector('body').style.overflow = "hidden"
    }
    if (CartView === false) {
      document.querySelector('body').style.overflow = "auto"
      document.querySelector('body').style.overflowX = "hidden"
    }
    // eslint-disable-next-line 
  }, [CartView])

  return (
    <>
      <Router>
        <Auth />
        <Cart />
        <Box  >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:name" element={<Mainpage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout/:id" element={<Shipping />} />
            <Route path="/checkout/thank-you/:id" element={<Thankyou />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/verify-email/:id/:token" element={<VerifyEmail />} />
            <Route path="/reset-pass/:id/:token" element={<Reset />} />
            <Route path="/profile/order/:id" element={<OrderInfo />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}

export default App;
