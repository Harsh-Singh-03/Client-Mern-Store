import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
// import { CircularProgress } from "@mui/material";
import { GetSingleProduct } from "../../Actions/productAction";
import { toggleAuthDisplay } from "../../Actions/UserAction";
import { useAlert } from 'react-alert'
import { AddToCart, ToggleCartPage } from "../../Actions/CartAction";
import { Avatar, Button, Modal, Rating, TextField } from "@mui/material";
import axios from "axios";

const Feature = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { isProduct, product } = useSelector(state => state.newProduct)
  // const { loading, Reviews } = useSelector(state => state.Reviews)
  const { isLoggedIn, UserData } = useSelector(state => state.TokenVerify)
  const { cartMessage, cartData, isCart } = useSelector(state => state.newCart)
  const [isCartMEssage, setIsCartMEssage] = useState(false) 
  const AlertMessage = useAlert()
  const [tempPrice, settempPrice] = useState(0)
  const [tempValue, settempValue] = useState(1)
  const [open, setOpen] = useState(false)
  const [open1, setOpen1] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [isUserRev, setIsUserRev] = useState(false)

// Fucntion for cart + - remove
  useEffect(() => {
   if(isProduct === true && isLoggedIn === true){
    settempPrice(product.data.price)
    // dispatch(GetAllReviews({productID: id}))
    product.data.reviews.forEach(rev =>{
      if(UserData._id === rev.user){
        setNewRating(rev.rating)
        setNewComment(rev.comment)
        setIsUserRev(true)
       }else{  
         setIsUserRev(false)
         setNewRating(0)
         setNewComment("")
      }
    })
   }
   // eslint-disable-next-line
  }, [isProduct, isLoggedIn])


  useEffect(() => {
   if(isCartMEssage === true && isCart === true){
    // alert(cartMessage)
    AlertMessage.success(cartMessage)
    setIsCartMEssage(false)
    console.log(cartData)
   }
   // eslint-disable-next-line
  }, [isCartMEssage, isCart])

  const addNew = async() =>{
    if(isLoggedIn === true){
     if(newRating >= 1 && newComment !== ""){
        const body = {
          productID: id,
          rating: newRating,
          comment: newComment
        }
        const data = await axios.post(`${process.env.REACT_APP_PRODUCT_URL}/add-product-review`,body)
        if(data.data.success === true){
          setOpen(false)
          dispatch(GetSingleProduct({id}))
          AlertMessage.success(data.data.message)
        }else{
          AlertMessage.error("Some Error Occured")
        }
      }else{
        AlertMessage.info('Rating can not be 0 and comment can not be blank')
      }
    }
  }
  const DeleteNew = async () =>{
    if(isLoggedIn === true){
      const data = await axios.post(`${process.env.REACT_APP_PRODUCT_URL}/delete-review`,{productID : id})
      if(data.data.success === true){
        dispatch(GetSingleProduct({id}))
        setOpen1(false)
        AlertMessage.success(data.data.message)
      }else{
        AlertMessage.error("Some Error Occured")
      }
    }
  }

  const updateRev = async () =>{
    // check rev updated or not 
    if(isLoggedIn === true){
     if(newRating >= 1 && newComment !== ""){
        const body = {
          productID: id,
          rating: newRating,
          comment: newComment
        }
        const data = await axios.post(`${process.env.REACT_APP_PRODUCT_URL}/update-review`,body)
        if(data.data.success === true){
          dispatch(GetSingleProduct({id}))
          setOpen1(false)
          AlertMessage.success(data.data.message)
        }else{
          AlertMessage.error("Some Error Occured")
        }
      }else{
       AlertMessage.info('Rating can not be 0 and comment can not be blank')
      }
    }
  }

  const addCart = async () =>{
    const {name, brand, ratings, numOfReviews, offer, images, comparePrice, price} = product.data
    const itemData = {
        productId: product.data._id,
        name,
        brand,
        ratings,
        numOfReviews,
        offer,
        images,
        comparePrice,
        quantity: tempValue || 1,
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
  const captureQuantity = (e) =>{
    if(e.target.value && e.target.value !== "0"){
      let No = parseInt(e.target.value)
      settempValue(No > 100 ? 100 : No)

    }else{
      settempValue(1)
    }
  }
  const handleClose = () =>{
    setOpen(false)
  }
  const handleClose1 = () =>{
    setOpen1(false)
  }
  return (
    <div className="product-details">
      {isProduct === true && (
        <>
          <h4>{product.data.name}</h4>
          <div className="d-flex">
           <Rating name="read-only" value={product.data.ratings} readOnly />
            <span>( {product.data.numOfReviews} )</span>
          </div>
          <div className="d-flex">
            <span style={{color: "#2874f0", display: "inline"}}>{product.data.brand}</span>
            <span style={{color: "red",display: "inline"}}>#{product.data.category}</span>
          </div>
            <p className="">{product.data.description.slice(0,100)}</p>
            <div className="d-flex">
              <span id="price" style={{color: "#fb641b"}}>{tempPrice.toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}</span>
            </div>
            <div className="fucntioning">
              <div className="quantity buttons_added">
                <input type="button" value="-" className="minus" onClick={() => settempValue(tempValue > 1 ? tempValue - 1 : 1)}/>
                <input type="number" step="1" min="1" max="100" name="quantity" value={`${tempValue}`} title="Qty" className="input-text qty text" size="4" pattern="" inputMode="" onChange={captureQuantity}/>
                <input type="button" value="+" className="plus" onClick={() => settempValue( tempValue < 100 ? tempValue + 1 : 100)}/>
              </div>
              <div className="addTOCart">
                <Button className="add-btn" onClick={addCart} >ADD TO CART</Button>
              </div>
            </div>
            <h5>Description :</h5>
            <p>{product.data.description}</p>
            {product.data.Specifications.length > 0 &&(
              <div>
                <h5>Specification</h5>
                <ul className="ul-list">
                  {product.data.Specifications.map((item, index)=>{
                    return(
                      <li className="list" key={index}><strong>{item.Spectype} -</strong> {item.spec}</li>
                    )
                  })}
                </ul>
              </div>
            )}
            {product.data.Highlights.length > 0 &&(
              <div>
                <h5>Highlights</h5>
                <ul className="ul-list">
                  {product.data.Highlights.map((item, index)=>{
                    return(
                      <li className="list" key={index}>{item.Heighlight}</li>
                    )
                  })}
                </ul>
              </div>
            )}
            <div className="review-container" style={{marginTop: 10}}>
              <h5>User Reviews </h5>
              <div className="d-flex" style={{marginTop: 15, alignItems: "center", justifyContent: "space-between"}}>
                <div className="d-flex" style={{alignItems: "center"}}>
                 <Rating name="read-only" value={product.data.ratings} readOnly />
                 <span className="count-rating" style={{color: "#808080", fontWeight: "500"}}>{product.data.numOfReviews} Reviews</span>
                </div>
                {isLoggedIn && isUserRev === true ? 
                  <Button className="rev-button" onClick={() => setOpen1(true)}>Customize Rating</Button>
                  : isLoggedIn && isUserRev === false ? 
                  <Button className="rev-button" onClick={() => setOpen(true)}>Rate Product</Button> :
                  <></>
                }
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className="pop-up-form">
                  <Rating
                    name="simple-controlled"
                    value={newRating}
                    size="large"
                    onChange={(event, newValue) => {
                      setNewRating(newValue);
                    }}
                  />
                  <TextField
                      id="outlined-multiline-static"
                      label="Comment"
                      multiline
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                   <Button className="rev-submit-btn" onClick={addNew}>Add Review</Button>
                </div>
            </Modal>
            <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div className="pop-up-form">
                  <Rating
                    name="simple-controlled"
                    value={newRating}
                    size="large"
                    onChange={(event, newValue) => {
                      setNewRating(newValue);
                    }}
                  />
                  <TextField
                      id="outlined-multiline-static"
                      label="Comment"
                      multiline
                      rows={4}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="d-flex">
                      <Button className="rev-submit-btn" onClick={updateRev}>Update Review</Button>
                      <Button className="sec-submit" onClick={DeleteNew}>Delete Review</Button>
                    </div>
                </div>
            </Modal>
              {product.data.reviews.length > 0 &&(
                <div className="rev-list"> 
                    {product.data.reviews.map((rev, index)=>{
                      return(
                        <div className="user-rev" key={index}>
                          <div className="profile d-flex" style={{alignItems: "center"}}>
                            <Avatar alt={rev.name} src={rev.avatar.url} />
                            <div>
                              <span style={{display: "block", fontSize: 12}}>{rev.name}</span>
                              <Rating size="small" name="read-only" value={rev.rating} readOnly />
                            </div>
                          </div>
                          <p style={{fontSize: 14, marginTop: 5}}>{rev.comment}</p>
                        </div>
                      )
                    })}
                </div>
             )}
           </div>
          {/* <button onClick={addNew}>Add a review</button>
          <button onClick={DeleteNew}>Delete review</button>
          <button onClick={updateRev}>Update review</button>
          <button onClick={addCart}>Cart</button> */}
        </>
      )}
    </div>
  )
}

export default Feature
