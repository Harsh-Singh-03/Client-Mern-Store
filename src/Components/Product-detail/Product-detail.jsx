import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleProduct } from "../../Actions/productAction";
import { CircularProgress } from "@mui/material";
import ProductGallery from "./ProductGallery";
import './productDetail.css'
import Navbar from "../Home/Navbar";
import Feature from "./Feature";
import Nav from "../Header/Nav";

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, isProduct, product } = useSelector(state => state.newProduct)

  useEffect(() => {
    if (id) {
      let data = { id }
      dispatch(GetSingleProduct(data))
    }
    else {
      alert('something went wrong')
      navigate('/')
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (isProduct === true && product.data._id === id) {
      let localArr = JSON.parse(localStorage.getItem('recent')) || [];
      if(localArr.length !== 0 && localArr.length <= 8){
        const idExists = localArr.some(item => item.data._id === id);
        if(!idExists){
          localArr.unshift(product)
          localStorage.setItem('recent', JSON.stringify(localArr));
        }else{
          localStorage.setItem('recent', JSON.stringify(localArr));
        }
      }
      else if(localArr.length !== 0 && localArr.length > 8){
        const idExists = localArr.some(item => item.data._id === id);
        if(!idExists){
          localArr.pop()
          localArr.unshift(product)
          localStorage.setItem('recent', JSON.stringify(localArr));
        }
      }
      else{
        localArr.unshift(product)
        localStorage.setItem('recent', JSON.stringify(localArr));
      }
    }
    // eslint-disable-next-line
  }, [isProduct])



  return (
    <div>
      {loading === false ?
        isProduct === true && (
          <>
            <Nav/>
            <Navbar display="none" padding="10px" />
            <div className="product-landingSections">
              <ProductGallery />
              <Feature />
            </div>
          </>
        ) : <CircularProgress />}
    </div>
  )
}

export default ProductDetail






// {clientSecret && (
//             <Elements options={options} stripe={stripePromise}>
//               <CheckoutForm />
//             </Elements>
//             )}



            // const StripeInit = (price) => {
            //   fetch("http://localhost:4000/product/create-payment-intent", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ price }),
            //   })
            //     .then((res) => res.json())
            //     .then((data) => setClientSecret(data.clientSecret));
            // }
            // const appearance = {
            //   theme: 'stripe',
            // };
            // const options = {
            //   clientSecret,
            //   appearance,
            // };