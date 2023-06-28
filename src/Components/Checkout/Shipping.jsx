import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { useAlert } from 'react-alert'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ProcessBar from './ProcessBar'
import './Checkout.css'
import ShippingDetail from './ShippingDetail'
import OrderDetail from './OrderDetail'
import { ToggleCartPage } from '../../Actions/CartAction'

const Shipping = () => {
    const { isCartItems,CartData } = useSelector((state) => state.CartItems)
    const { processCount } = useSelector((state) => state.CheckoutProcess)
    const { isLoggedIn } = useSelector((state) => state.TokenVerify);
    const AlertMessage = useAlert()
    const Dispatch = useDispatch()
    const { id } = useParams()
    const Navigate = useNavigate()
    const [isCheckout, setisCheckout] = useState(false)

    const CheckCart = async (id) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_CART_URL}/checkout-cart`, id);
            if (data.success === true) {
                setisCheckout(data.success)
                AlertMessage.success("Cart Ready to checkout")
            }
        } catch (error) {
            console.log(error)
            AlertMessage.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if(isLoggedIn === true){
            if (CartData.isCheckout !== true) {
                CheckCart({ id })
            } else {
                setisCheckout(CartData.isCheckout)
            }
        }
        else{
            Navigate('/')
            Dispatch(ToggleCartPage("CART_OPEN"))
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='Checkout-Page'>
            {isLoggedIn === true ?
                isCheckout !== true ? <CircularProgress style={{ position: "absolute", top: "50%", left: "50%" }} /> :
                <div>
                    <ProcessBar />
                    {processCount === 1 &&
                        <div className='shipping-details-page'>
                            <ShippingDetail />
                            <div id='Devider'> </div>
                            <OrderDetail isItems={isCartItems} Data={CartData.items} Price={CartData.totalPrice}/>
                        </div>
                    }
                    {processCount === 2 &&
                        <div style={{ display: processCount === 2 ? "block" : "none" }}>
                            <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE)}>
                                <Payment />
                            </Elements>
                        </div>}
                    {processCount === 3 && <CircularProgress />}
                </div>
            : <></>}
        </div>
    )
}

export default Shipping
