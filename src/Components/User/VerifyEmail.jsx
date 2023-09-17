import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from '../Header/Nav'
import axios from 'axios'
import { useAlert } from 'react-alert'

const VerifyEmail = () => {
    const {id, token} = useParams()
    const [count, setCount] = useState(5);
    const [countDis, setCountdis] = useState('none');
    const history = useNavigate();
    const alertMessage = useAlert()
    const VerifyEmail = async() =>{
     const body = {
        id,
        token
     }
     const data = await axios.post(`${process.env.REACT_APP_USER_URL}/verify-email`,body)
     if(data.data.success === true){
        alertMessage.success(data.data.message)
        setCountdis("block")
     }
     if(data.data.success === false){
        alertMessage.info(data.data.message)
        setCountdis("block")
     }
    }
    useEffect(() => {
      VerifyEmail()
      // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
      if(countDis === "block"){
         const countdownInterval = setInterval(() => {
            if (count === 1) {
              clearInterval(countdownInterval);
              // Navigate to a new page when the countdown reaches 1
              history('/profile');
            } else {
              setCount(count - 1);
            }
          }, 1000);
      
          // Cleanup the interval when the component unmounts
          return () => {
            clearInterval(countdownInterval);
          };
      }
    // eslint-disable-next-line
    }, [countDis, count])
    
    
  return (
    <div>
      <Nav/>
      <h1 style={{marginTop: 150, textAlign: "center", display: countDis}}>Countdown: {count}</h1>
    </div>
  )
}

export default VerifyEmail
