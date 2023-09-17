import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleAuthDisplay } from '../../Actions/UserAction'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { CircularProgress } from '@mui/material'

const Forget = () => {
    const [Email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const Dispatch = useDispatch()
    const alertMessage = useAlert()
    const onChange = (e) =>{
        setEmail(e.target.value)
    }
    const ToggleLabel = (e) => {
        let label = e.target.previousElementSibling
        label.style.transform = "translateY(0px)"
        label.style.top = "-20px"
        label.style.fontSize = "12px"
    }
    const toggleSubmit = async (e) =>{
       e.preventDefault()
       setLoading(true)
       const body = {
           email: Email
        }
        const data = await axios.post(`${process.env.REACT_APP_USER_URL}/reset-pass-request`,body)
        if(data.data.success){
           Dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY1"))
           alertMessage.success(data.data.message)
           setLoading(false)
       }
    }
  return (
    <div>
      {loading === false? 
        <form className="Sign-up-form" onSubmit={toggleSubmit}>
            <div className="Auth-Input-Box">
            <label htmlFor="" className="Auth-Label" >Enter Your Email</label>
            <input type="email" className="Auth-Input" onInput={onChange} name="email" onFocus={ToggleLabel} />
            </div>
        <button type="submit" className="Auth-Submit-Button">Reset Request</button>
        </form>:<CircularProgress color="primary" style={{position: "absolute",top:"calc(50% - 20px)",left: "66%",color: "#1976d2"}}/>
     }
  </div>
  )
}

export default Forget
