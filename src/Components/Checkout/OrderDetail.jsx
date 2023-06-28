import { Rating } from '@mui/material'
import React from 'react'
// import { useSelector } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';

const OrderDetail = (props) => {
    // const { isCartItems, CartData } = useSelector((state) => state.CartItems)
    return (
        <div className='check-out-order-detail'>
            <h4 className='title'>Order Summery :</h4>
            <div className='order-detail-list'>
                {props.isItems === true && props.Data.map((item, index) => {
                    return (
                        <div className="order-item cart-item-box" key={index}>
                            <div className='cart-img'>
                                <img src={item.images[0].url} alt="product" />
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
                                <div className="order-price">
                                    <p><span style={{ color: "#212121", fontWeight: "600", marginRight: "10px" }}>Price :</span>{item.quantity} <CloseIcon /> {item.price.toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })} </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="total_price">
                <h4>Total Price :</h4>
                <p>{props.Price.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}</p>
            </div>
        </div>
    )
}

export default OrderDetail
