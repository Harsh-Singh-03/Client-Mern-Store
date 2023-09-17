import React, { useEffect, useState } from 'react'
import Nav from '../Header/Nav'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthDisplay } from '../../Actions/UserAction';
import User from './User';
import Addresses from './Addresses';
import Orders from './Orders';
import ProfileDetails from './ProfileDetails';
import { getCustomerOrders } from '../../Actions/OrderAction';
import { Alert } from '@mui/material';
import axios from 'axios';
import { useAlert } from 'react-alert';

const Profile = () => {

    const { isLoggedIn, loading , UserData} = useSelector((state) => state.TokenVerify);
    const { isCustomerOrder } = useSelector((state) => state.getCustomerOrders);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryParamValue = searchParams.get('redirect');
    const Navigate = useNavigate();
    const Dispatch = useDispatch()
    const alertMessage = useAlert()
    const [Tab, setTab] = useState(queryParamValue !== undefined && queryParamValue !== null ? queryParamValue : "profile")
    const [thumbLeft, setthumbLeft] = useState("0px")

    useEffect(() => {
        if (loading !== true) {
            if (isLoggedIn !== true) {
                Navigate('/')
                Dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY"))
            }else{
                if(isCustomerOrder === false){
                    Dispatch(getCustomerOrders(UserData._id))
                }
            }
        }
        // eslint-disable-next-line
    }, [loading])

    useEffect(() => {
        if (queryParamValue === "orders") {
            setTab("orders")
            setthumbLeft("33.33%")
        }
        if (queryParamValue === "addresses") {
            setTab("addresses")
            setthumbLeft("66.667%")
        }
        if (queryParamValue === "profile") {
            setTab("profile")
            setthumbLeft("0px")
        }
        if (queryParamValue === null) {
            setTab("profile")
            setthumbLeft("0px")
        }
        console.log(Tab)
        // eslint-disable-next-line
    }, [queryParamValue])
    
    const handleCategoryChange = (newCategory) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('redirect', newCategory);
        setTab(newCategory)
        Navigate({ search: searchParams.toString() });
    };
    const verifyEmail = async() =>{
        const body = {email: UserData.email}
        const data =  await axios.post(`${process.env.REACT_APP_USER_URL}/request-email-verification`, body)
        console.log(data)
        if(data.data.success === true){
            alertMessage.success(data.data.message)
        }
    }

    return (
        <div style={{ paddingTop: 55 }}>
            <Nav />
                {isLoggedIn === true && UserData.emailVerification === false ?  
                    <Alert className='alert-verify' severity="warning"><span>Email not verified —  </span><span style={{textDecoration: "underline", cursor: "pointer"}} onClick={verifyEmail}>Click Here TO Verify Your Email</span></Alert>
                    : <></>
                }
            <div className="user-profile-page">
                <div className="side-profile-info">
                    <User/>
                </div>
                <div className='side-content-info'>
                    <div className="nav-tabs">
                        <span className="tab" onClick={() =>handleCategoryChange("profile")}>Home</span>
                        <span className="tab" onClick={() =>handleCategoryChange("orders")}>My Orders</span>
                        <span className="tab"onClick={() =>handleCategoryChange("addresses")}>Addresses</span>
                    </div>
                    <div className="track">
                       <div className="thumb" style={{left: thumbLeft}}></div>
                     </div>
                     {Tab === 'addresses' && (
                        <Addresses/>
                     )}
                     {Tab === 'orders' && (
                        <Orders/>
                     )}
                     {Tab === 'profile' || Tab === null ? <ProfileDetails/> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Profile
