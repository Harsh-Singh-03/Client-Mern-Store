import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
// import { CheckoutProcess } from "../../Actions/CartAction";
import { useNavigate } from "react-router-dom";
import { placedOrder } from "../../Actions/OrderAction";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#fb641b"),
  backgroundColor: "#fb641b",
  width: "300px",
  maxWidth: "400px",
  marginBottom: "20px",
  marginTop: "10px",
  '&:hover': {
    backgroundColor: "#f95503",
  },
}));

const Payment = () => {

  const Navigate = useNavigate()
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { UserData } = useSelector((state) => state.TokenVerify);
  const { CartData } = useSelector((state) => state.CartItems)
  const { isOrderCreated, orderID } = useSelector((state) => state.CreateOrder);
  const { isOrderPlaced, placedMessage } = useSelector((state) => state.PlacedOrder);

  const Dispatch = useDispatch()

  useEffect(() => {
    console.log(isOrderCreated)
    if (isOrderCreated === true) {
      // alert.success(orderID)
      // alert.success(message)
    }
    if(isOrderPlaced === true){
      alert.success(placedMessage)
      if(orderID) Navigate(`/profile/order/${orderID}`)
    }
    // eslint-disable-next-line
  }, [isOrderCreated, isOrderPlaced])

  const successPayProcess = async (result) => {
    if (result.paymentIntent.status === "succeeded" && orderID) {
      let details = {
        orderStatus: "placed",
        orderID,
        payment: {
          paymentID: result.paymentIntent.id,
          paymentMode: result.paymentIntent.payment_method_types[0] || "Card",
          paymentStatus: result.paymentIntent.status
        }
      }
    await Dispatch(placedOrder(details))
    } else {
      alert.error("There's some issue while processing payment ");
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      const body = { id: CartData._id }
      const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_URL}/create-payment-intent`, body);

      const client_secret = data.clientSecret;
      console.log(typeof client_secret)
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: UserData.name,
            email: UserData.email,
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log(result)
          successPayProcess(result)
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error)
    }
  };

  return (
    <div className="payment-page">
      <div className="paymentContainer" style={{ marginTop: 100 }}>
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <h4>Enter Card Details</h4>
          <div className="payment-input">
            <CardNumberElement className="paymentInput" />
          </div>
          <div className="payment-input">
            <CardExpiryElement className="paymentInput" />
          </div>
          <div className="payment-input">
            <CardCvcElement className="paymentInput" />
          </div>

          {/* <input
            type="submit"
            value={`Pay - ₹${CartData.totalPrice !== undefined ? CartData.totalPrice : 0}`}
            ref={payBtn}
            className="paymentFormBtn"
          /> */}
          <ColorButton type="submit"  ref={payBtn} className="paymentFormBtn">{`Pay - ₹${CartData.totalPrice !== undefined ? CartData.totalPrice : 0}`}</ColorButton>
            <p>Checkout Powered By Stripe</p>
        </form>
      </div>
    </div>
  );
};

export default Payment;