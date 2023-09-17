import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../Header/Nav'
import { Card, CardContent, Rating } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const OrderInfo = () => {
    const {id} = useParams()
    const [OrderData, setOrderData] = useState({})
    const [isLoad, setIsLoad] = useState(true)
    const fetchOrder = async () =>{
        const data = await axios.get(`${process.env.REACT_APP_ORDER_URL}/get-order?id=${id}`)
        console.log(data)
        if(data.data.success === true){
            setOrderData(data.data.OrderData)
            setIsLoad(false)
        }
    }
    useEffect(() => {
        if(id){
            fetchOrder()
        }
        // eslint-disable-next-line
    }, [])
    
  return (
    <div style={{paddingTop: "55px"}}>
      <Nav/>
        {isLoad && (
            <div className="loading-page">
                <div className="custom-loader"></div>
            </div>
        )}
      {isLoad === false && (
        <div className='order-details-page'>
          <div className="order-id-head">
            <h2>#{OrderData._id}</h2>
          </div>
          <div className="item-details">
            <Card className="item-list" style={{background: "#fff"}}>
              <span style={{color: "#fb641b"}}>#{OrderData.orderStatus}</span>
              <div style={{marginTop: 20}}>
                {OrderData.lineItems && OrderData.lineItems.map((item, index)=>{
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
                <p>{OrderData.totalPrice&& OrderData.totalPrice.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}</p>
            </div>
            </Card>
            <div className="ship-details">
              <Card className="details">
                 
                 <div className='payment-staus'><span style={{fontWeight: "600"}}>Payment:</span><span style={{color: "#ff9f00"}}>#{OrderData.payment.paymentStatus}</span> </div>
                 <h3 style={{margin: "20px 0"}}>Shipping Details :</h3>
                 <div className='payment-staus'><span style={{fontWeight: "600"}}>Status:</span><span style={{color: "#fb641b"}}>#{OrderData.shipment.shipmentStatus}</span> </div>
                 <CardContent className='card-content'>
                    <h4>{OrderData.customer.Addresses.country}, {OrderData.customer.Addresses.state}, {OrderData.customer.Addresses.city}</h4>
                    <p>{OrderData.customer.Addresses.street}</p>
                    {OrderData.customer.Addresses.houseName && <p>{OrderData.customer.Addresses.houseName}</p>}
                    <span>{OrderData.customer.Addresses.zip}</span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default OrderInfo
