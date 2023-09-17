import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
// import { CircularProgress } from "@mui/material";
import { AddReview, DeleteReview, GetAllReviews, UpdateReview } from "../../Actions/productAction";
import { toggleAuthDisplay } from "../../Actions/UserAction";
import { useAlert } from 'react-alert'
import { AddToCart, ToggleCartPage } from "../../Actions/CartAction";

const Feature = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { isProduct, product } = useSelector(state => state.newProduct)
  // const { loading, Reviews } = useSelector(state => state.Reviews)
  const { isLoggedIn } = useSelector(state => state.TokenVerify)
  const { isReviewSuccess, newRev } = useSelector(state => state.newReviews)
  const { message, isReviewDelete } = useSelector(state => state.deleteReview)
  const { updateMessage, revData, isReviewUpdate } = useSelector(state => state.updateReview)
  const { cartMessage, cartData, isCart } = useSelector(state => state.newCart)
  const [isCartMEssage, setIsCartMEssage] = useState(false) // for showing alert have to create a temp state...
  const [isUpdateReviewMessage, setIsUpdateReviewMessage] = useState(false) // for showing alert have to create a temp state...
  const [isDeleteReviewMessage, setIsDeleteReviewMessage] = useState(false) // for showing alert have to create a temp state...
  // const [isAddReviewMessage, setIsReviewMessage] = useState(false) // for showing alert have to create a temp state...
  const AlertMessage = useAlert()
// Fucntion for cart + - remove
  useEffect(() => {
   if(isProduct === true){
    dispatch(GetAllReviews({productID: id}))
    console.log(product)
   }
   // eslint-disable-next-line
  }, [isProduct])


  useEffect(() => {
    if(isReviewSuccess === true){
      console.log(newRev)
    }
    // eslint-disable-next-line
  }, [isReviewSuccess])

  useEffect(() => {
   if(isDeleteReviewMessage === true && isReviewDelete === true){
    // alert(message)
    AlertMessage.error(message)
    setIsDeleteReviewMessage(false)
   }
   // eslint-disable-next-line
  }, [isDeleteReviewMessage])

  useEffect(() => {
   if(isUpdateReviewMessage === true && isReviewUpdate === true){
    AlertMessage.success(updateMessage)
    console.log(revData)
    setIsUpdateReviewMessage(false)
   }
   // eslint-disable-next-line
  }, [isUpdateReviewMessage])

  useEffect(() => {
   if(isCartMEssage === true && isCart === true){
    // alert(cartMessage)
    AlertMessage.success(cartMessage)
    setIsCartMEssage(false)
    console.log(cartData)
   }
   // eslint-disable-next-line
  }, [isCartMEssage])

  const addNew = async() =>{
    const data = {
      productID: id,
      rating: 4,
      comment: "Try to add product review Let See!"
    }
    // && UserData.emailVerification === true will add future
    if(isLoggedIn === true ){
     await dispatch(AddReview(data))
    }else{
      dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY"))
    }
  }
  const DeleteNew = async () =>{
    if(isLoggedIn === true){
     await dispatch(DeleteReview({productID: id}))
     setIsDeleteReviewMessage(true)
    }
  }

  const updateRev = async () =>{
    // check rev updated or not 
    const data = {
      productID: id,
      rating: 5,
      comment: "Try to update product review Let See!"
    }
   await dispatch(UpdateReview(data))
   setIsUpdateReviewMessage(true)
  }

  const addCart = async () =>{
    const {name, brand, ratings, numOfReviews, offer, images, comparePrice, quantity, price} = product.data
    const itemData = {
        productId: product.data._id,
        name,
        brand,
        ratings,
        numOfReviews,
        offer,
        images,
        comparePrice,
        quantity: quantity || 1,
        price
    }
    // console.log(itemData)
    if(isLoggedIn === true ){
      await dispatch(AddToCart(itemData))
      dispatch(ToggleCartPage("CART_OPEN"))
      setIsCartMEssage(true)
     }else{
       dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY"))
     }
  }
  return (
    <div className="product-details">
      {isProduct === true && (
        <>
          <h4>{product.data.name}</h4>
          <div className="d-flex">
            <span style={{color: "#2874f0", display: "inline"}}>{product.data.brand}</span>
            <span style={{color: "red",display: "inline"}}>#{product.data.category}</span>
          </div>
          
          <button onClick={addNew}>Add a review</button>
          <button onClick={DeleteNew}>Delete review</button>
          <button onClick={updateRev}>Update review</button>
          <button onClick={addCart}>Cart</button>
        </>
      )}
    </div>
  )
}

export default Feature
