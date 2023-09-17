import { Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useSelector } from 'react-redux';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from 'react-router-dom';

const ProfileDetails = () => {
    const [CalPrice, setCalPrice] = useState(0)
    const [product, setProduct] = useState([])
    const { isLoggedIn , UserData} = useSelector((state) => state.TokenVerify);
    const { isCustomerOrder, customerOrder } = useSelector((state) => state.getCustomerOrders);
    useEffect(() => {
      if(isCustomerOrder === true){
        let price = 0
        customerOrder.forEach(el =>{
         price = price + el.totalPrice
        })
        setCalPrice(price)
      }
      // eslint-disable-next-line
    }, [isCustomerOrder])
    useEffect(() => {
        let data = localStorage.getItem('recent')
        if(data){
            console.log(JSON.parse(data))
            setProduct(JSON.parse(data))
        }
    }, [])
    
  return (
    <div className='profile-details'>
        {isLoggedIn === true &&
        <>
            <div className="topGrid">
                <Card className='card-details'>
                    <LocalMallIcon style={{fill: "#fb641b"}}/>
                    <span>Total {customerOrder.length} Orders</span>
                </Card>
                <Card className='card-details'>
                    <CurrencyRupeeIcon style={{fill: "#388e3c"}}/>
                    <span>Total {CalPrice}/- Spent</span>
                </Card>
            </div>
            <div className="welcomeMessage" style={{display: "flex", alignItems:"center", gap: 20}}>
                <h1>Welcome ! </h1>
                <h2 style={{color: "#1976d2"}}> {UserData.name}</h2>
            </div>
            <div className="about" style={{margin: "30px 0", marginTop: "10px"}}>
              <span style={{fontWeight: 300, lineHeight: "180%"}}>{UserData.about}</span>
            </div>
            <div className="recentProduct">
                <h1 style={{marginBottom: 40}}>Recently Viewed Products</h1>
                <div className='recent-list'>
                    {product.map((data, index) => {
                        return (
                            <Link to={`/product/${data._id}`} className='product-box' key={index} style={{textDecoration: "none", textAlign: "center"}} >
                                <img src={data.images[0].url} alt="product"/>
                                <p className="title" style={{marginTop: "20px"}}>{data.name.slice(0, 20)} {data.name.length > 20 ? "..." : "" }</p>
                                <p className="price">&#8377;{data.price}</p>
                                <p className="brand">{data.brand}</p>
                            </Link>
                        )
                    })}       
                </div>
            </div>
         </>
        }
    </div>
  )
}

export default ProfileDetails
