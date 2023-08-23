import { useDispatch, useSelector } from "react-redux";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { List, ListItem } from "@mui/material";
import { useRef } from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { SIGNOUT, TokenVerify } from "../../Actions/UserAction";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';


const ProfileBtn = () => {
    const { isLoggedIn, UserData } = useSelector((state) => state.TokenVerify);
    const listRef = useRef(null)
    const iconRef = useRef(null)
    const Dispatch = useDispatch()

    const OnList = () =>{
        listRef.current.classList.add("pop-up-list-active")
        iconRef.current.style.transform = "rotate(90deg)"
    }
    const OffList = () =>{
        listRef.current.classList.remove("pop-up-list-active")
        iconRef.current.style.transform = "rotate(-90deg)"
    }
    const LogOut = async () =>{
       await Dispatch(SIGNOUT())
       await Dispatch(TokenVerify())
    }
    return (
        <div className="profile-nav">
            {isLoggedIn === true &&
                <>
                    <div className="profile-icon-toogle" onMouseEnter={OnList} onMouseLeave={OffList}>
                        <img src={UserData.avatar.url} alt="" />
                        <ChevronLeftIcon className="arrow-icon" ref={iconRef} />
                    </div>
                    <List className="pop-up-list" ref={listRef} onMouseEnter={OnList} onMouseLeave={OffList}>
                        <ListItem  style={{padding: "10px", paddingRight: 20}}>
                            <AccountCircleIcon  style={{paddingRight: 10, width: 18, fill: "#1976d2"}}/>
                            <Link to="/profile" style={{fontSize: 14, color: "#212121", cursor: "pointer", textDecoration: 'none',fontWeight: 600}}>My Profile</Link>
                        </ListItem>
                        <ListItem  style={{padding: "10px", paddingRight: 20}}>
                            <ShoppingBasketIcon style={{paddingRight: 10, width: 18, fill: "#fb641b"}}/>
                            <Link to="/profile?redirect=orders" style={{fontSize: 14, color: "#212121", cursor: "pointer", textDecoration: 'none',fontWeight: 600}}>My Orders</Link>
                        </ListItem>
                        <ListItem  style={{padding: "10px", paddingRight: 20}}>
                            <ShareLocationIcon style={{paddingRight: 10, width: 18, fill: "#ff9f00"}}/>
                            <Link to="/profile?redirect=addresses" style={{fontSize: 14, color: "#212121", cursor: "pointer", textDecoration: 'none',fontWeight: 600}}>My Addresses</Link>
                        </ListItem>
                        <ListItem className="list-fucn-profile" style={{padding: "10px", paddingRight: 20}} onClick={LogOut}>
                            <ExitToAppIcon style={{paddingRight: 10, width: 18, fill: 'red'}}/>
                            <span style={{fontSize: 14, color: "#212121", cursor: "pointer", fontWeight: 600}}>Log Out</span>
                        </ListItem>
                    </List>
                </>
            }
        </div>
    )
}

export default ProfileBtn
