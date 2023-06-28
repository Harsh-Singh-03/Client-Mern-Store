import { useDispatch, useSelector } from "react-redux";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { List, ListItem, ListItemText } from "@mui/material";
import { useRef } from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { SIGNOUT, TokenVerify } from "../../Actions/UserAction";

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
                        <ListItem className="list-fucn-profile" style={{padding: "10px"}} onClick={LogOut}>
                            <ExitToAppIcon style={{paddingRight: 5, width: 20}}/>
                            <ListItemText primary="Log Out" />
                        </ListItem>
                        <ListItem  style={{padding: "10px"}}>
                            <ListItemText primary="Single-line item" />
                        </ListItem>
                        <ListItem  style={{padding: "10px"}}>
                            <ListItemText primary="Single-line item" />
                        </ListItem>
                    </List>
                </>
            }
        </div>
    )
}

export default ProfileBtn
