import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useNavigate } from 'react-router-dom';
import { ToggleCartPage } from '../../Actions/CartAction';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#fb641b"),
    backgroundColor: "#fb641b",
    width: "calc(100% - 40px)",
    marginLeft: "20px",
    '&:hover': {
        backgroundColor: "#f95503",
    },
}));
const CartBottom = () => {
    const Dispatch = useDispatch()
    const { CartData } = useSelector((state) => state.CartItems)
    const Navigate = useNavigate()

    const Checkout = () =>{
        Navigate(`/checkout/${CartData._id}`)
        Dispatch(ToggleCartPage("CART_CLOSE"))
    }

    return (
        <div className='bottom-fixed-section'>
            {CartData.items.length > 0 && 
            <>
            <div style={{display: "flex", justifyContent: "space-between", width: "calc(100% - 40px)", marginLeft: "20px", alignItems: "center", marginBottom: 10}}>
            <h4>TOTAL : </h4>
            <div className="priceBox">
                {CartData.totalSaved !== 0 && <span className='com-price'>{CartData.actualPrice ? CartData.actualPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }) : ""}</span>}
                <span className='-price'>{CartData.totalPrice ? CartData.totalPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }) : ""}</span>
                {CartData.totalSaved !== 0 && <span style={{ margin: "0px 5px" }}>|</span>}
                {CartData.totalSaved !== 0 && <span className='com-price-discount'>{CartData.totalSaved !== 0 ? Math.round(((CartData.actualPrice - CartData.totalPrice) / CartData.actualPrice) * 100): ""}{CartData.totalSaved !== 0 ? "% OFF": ""}</span>}
            </div>
            </div>
            <ColorButton variant="contained" onClick={Checkout} ><FlashOnIcon/>Checkout</ColorButton>
            </>
          }       
        </div>
    )
}

export default CartBottom
