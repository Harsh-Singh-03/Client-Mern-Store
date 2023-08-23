import React, { useEffect, useState } from 'react'
import Nav from '../Header/Nav'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthDisplay } from '../../Actions/UserAction';
import User from './User';
import Addresses from './Addresses';

const Profile = () => {

    const { isLoggedIn, loading } = useSelector((state) => state.TokenVerify);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryParamValue = searchParams.get('redirect');
    const Navigate = useNavigate();
    const Dispatch = useDispatch()
    const [Tab, setTab] = useState(queryParamValue !== undefined && queryParamValue !== null ? queryParamValue : "profile")
    const [thumbLeft, setthumbLeft] = useState("0px")

    useEffect(() => {
        if (loading !== true) {
            if (isLoggedIn !== true) {
                Navigate('/')
                Dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY"))
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

    return (
        <div style={{ paddingTop: 55 }}>
            <Nav />
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
                </div>
            </div>
        </div>
    )
}

export default Profile
