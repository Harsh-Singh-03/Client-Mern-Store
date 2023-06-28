import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OrderDetail from './OrderDetail'

const Thankyou = () => {
    const { id } = useParams()
    const [isOrder, setIsOrder] = useState(false)
    const [OrderData, setOrderData] = useState({})
    const getOrder = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_ORDER_URL}/get-order?id=${id}`);
            console.log(data)
            if (data.success === true) {
                setIsOrder(data.success)
                setOrderData(data.OrderData)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (id) {
            getOrder()
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div style={{display: 'grid', placeItems: "center"}}>
            {isOrder === true &&
                <div className='thank-you-page'>
                    <div className='Devider'> </div>
                    <OrderDetail isItems={isOrder} Data={OrderData.lineItems} Price={OrderData.totalPrice} />
                </div>
            }
        </div>
    )
}

export default Thankyou
