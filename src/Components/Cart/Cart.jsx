import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleCartPage, getCartItems, updateCart, removeCart } from "../../Actions/CartAction";//
import { useAlert } from 'react-alert'
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CircularProgress, Rating } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import DoneIcon from '@mui/icons-material/Done';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
// import FlashOnIcon from '@mui/icons-material/FlashOn';
import CartBottom from './CartBottom';

const Cart = () => {
  const Dispatch = useDispatch()
  const AlertMessage = useAlert()
  const { CartView } = useSelector((state) => state.CartDisplay)
  const { CartMessage, isCartItems, CartData, loading } = useSelector((state) => state.CartItems)
  const { UCartMessage, UpCartData, isUpCart } = useSelector(state => state.updateCart)
  const { RCartMessage, RCartData, isRCart } = useSelector(state => state.removeCart)
  const { isLoggedIn } = useSelector((state) => state.TokenVerify);
  const [isCartCheck, setIsCartCheck] = useState(false)
  const [inputQ, setInputQ] = useState(0)
  const [discountToggle, setDiscountToggle] = useState(-1)

  useEffect(() => {
    if (CartView === true) {
      Dispatch(getCartItems())
    }
    // eslint-disable-next-line
  }, [Dispatch, CartView])

  useEffect(() => {
    if (isCartItems === false) {
      AlertMessage.info(CartMessage)
    }
    // eslint-disable-next-line
  }, [isCartItems])

  useEffect(() => {
    if (isUpCart === true) {
      console.log(UpCartData)
      AlertMessage.success(UCartMessage)
    }
    // eslint-disable-next-line
  }, [isUpCart])

  useEffect(() => {
    if (isRCart === true) {
      console.log(RCartData)
      AlertMessage.success(RCartMessage)
    }
    // eslint-disable-next-line
  }, [isRCart])

  const toggle = () => {
    Dispatch(ToggleCartPage("CART_CLOSE"))
  }
  const cartUpdation = async (Q, id) => {
    if (Q <= 0) {
      AlertMessage.error("Quantity should be greater than 0, Else try remove")
    } else if (Q > 90) {
      AlertMessage.error("Quantity should be less than 90")
    }
    else {
      await Dispatch(updateCart({ quantity: Q, productId: id }))
      await Dispatch(getCartItems())
    }
  }
  const cartRemove = async (id) => {
    await Dispatch(removeCart({ productId: id }))
    await Dispatch(getCartItems())
  }
  const UpdateQuantity = (e, productId) => {
    e.preventDefault()
    if (inputQ !== 0 && inputQ !== null && inputQ !== undefined && inputQ <= 90) {
      cartUpdation(inputQ, productId)
    }
  }
  const checkDisplay = (e) => {
    setIsCartCheck(true)
    setInputQ(Number(e.target.value))
    e.target.parentElement.nextElementSibling.style.opacity = 1
  }
  const updateQ1 = (e, productId) => {
    if (e.target.style.opacity === "1") {
      setIsCartCheck(false)
      if (inputQ !== 0 && inputQ !== null && inputQ !== undefined && inputQ <= 90) {
        cartUpdation(inputQ, productId)
      }
      else {
        AlertMessage.info(inputQ > 90 ? "Quantity should be less than 90" : "Please Enter Valid Quantity")
      }
    }
  }

  return (
    <div className={CartView === false ? 'pop-up-cart-page' : "pop-up-cart-page pop-up-cart-page-active"}>
          <div style={{ flex: 1 }} onClick={toggle}></div>
          <div className={CartView === false ? 'pop-up-cart' : "pop-up-cart pop-up-cart-active"}>
            <div className='cart-head'>
              <h4>MY CART</h4>
              <CloseIcon id="cartClose" onClick={toggle} />
            </div>
            <div className='cart-body'>
              {loading === false && isLoggedIn === true ?
                isCartItems === true ? CartData.items.map((item, index) => {
                  const price = item.price * item.quantity
                  const formattedPrice = price.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                  let formattedPrice1 = ''
                  if (item.comparePrice) {
                    const Comprice = item.comparePrice * item.quantity
                    formattedPrice1 = Comprice.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                  }
                  return (
                    <div className='cart-item-box' key={index} style={{ marginTop: index === 0 ? 0 : 8 }}>
                      <div className='cart-img'>
                        <img src={item.images[0].url} alt="product" />
                        <p onClick={() => cartRemove(item.productId)}>Remove</p>
                      </div>
                      <div className="cart-item-details">
                        <p className='name'>{item.name.slice(0, 70)} {item.name.length > 70 ? "..." : ""}</p>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span className='brand'>{item.brand}</span>
                          {item.variant && <span className='variant'>{item.variant} </span>}
                          <span className='pipe' style={{ margin: "0px 5px" }}>|</span>
                          {item.numOfReviews === 0 ? <span className='rating-review-blank'>No Reviews</span> :
                            <div className='rating-review'>
                              <Rating name="half-rating" defaultValue={item.ratings} precision={0.1} readOnly size='small' style={{ fontSize: 12, color: '#FFB400' }} />
                              <span className='num-of' style={{ marginLeft: 3 }}>( {item.numOfReviews} )</span>
                            </div>
                          }
                        </div>
                        <div className="priceBox">
                          {item.comparePrice && <span className='com-price'>{formattedPrice1}</span>}
                          <span className='-price'>{formattedPrice}</span>
                          {item.comparePrice && <span style={{ margin: "0px 5px" }}>|</span>}
                          {item.comparePrice && <span className='com-price-discount'>{Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)}% OFF</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <form className="btnss-box" onSubmit={(e) => UpdateQuantity(e, item.productId)}>
                            <div className='btnss-box-1'>
                              <AddIcon className='update-btn' onClick={() => cartUpdation(item.quantity + 1, item.productId)} />
                              <input type="number" defaultValue={item.quantity} min={1} max={90} onChange={checkDisplay} />
                              <RemoveIcon className='update-btn' onClick={() => cartUpdation(item.quantity - 1, item.productId)} />
                            </div>
                            <DoneIcon onClick={(e) => updateQ1(e, item.productId)} className='doneIcon' style={{ opacity: 0, pointerEvents: isCartCheck === true ? "auto" : "none" }} />
                          </form>
                          {/* <button className='buy-button-cart'><FlashOnIcon />Buy</button> */}
                        </div>
                      </div>
                      {item.offer && <div className='discount-box' onClick={() => setDiscountToggle(discountToggle === index ? -1 : index)}>
                        {discountToggle === index ?
                          <>
                            <KeyboardBackspaceOutlinedIcon style={{ fill: "#fff", width: "14px", cursor: "pointer", paddingLeft: 10 }} />
                            <span>Back</span>
                          </> :
                          <>
                            <DiscountIcon />
                            <span>{item.offer.length} Available</span>
                          </>
                        }
                      </div>}
                      {item.offer && <div className={discountToggle === index ? 'side-discount-box side-discount-box-slide' : 'side-discount-box'}>
                        {item.offer.map((offer, index) => {
                          return (
                            <div key={index} style={{ display: "flex", marginBottom: 8 }}>
                              <strong style={{ minWidth: 'max-content', marginRight: 5 }}>{index + 1} : </strong>   <p>{offer.offerDescription}</p>
                            </div>
                          )
                        })}
                      </div>}
                    </div>
                  )
                }) : <> </> : <div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}><CircularProgress /></div>}
            </div>
            {isLoggedIn === true && <CartBottom />}
          </div>
    </div>
  )
}

export default Cart
