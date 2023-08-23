import { Avatar, Button, Card, CircularProgress, Fab } from '@mui/material'
import React, { useRef, useState } from 'react'
import './User.css'
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useAlert } from 'react-alert';
import DetailForm from './DetailForm';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloseIcon from '@mui/icons-material/Close';
import { TokenVerify } from '../../Actions/UserAction';

const User = () => {

    const fileInputRef = useRef(null);
    const formRef = useRef(null);
    const Dispatch = useDispatch()
    const { UserData, isLoggedIn } = useSelector((state) => state.TokenVerify);
    const [isLoading, setIsLoading] = useState(false)
    let formdata = new FormData();
    const AlertMessage = useAlert()

    const capture = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const avatarBox = document.querySelector(".avatar-box")
            const imgEle = avatarBox.querySelector('img')
            imgEle.src = reader.result
        };
        reader.readAsDataURL(file);
        formdata.append('file', file)
        setIsLoading(true)
        const { data } = await axios.post(`${process.env.REACT_APP_USER_URL}/update-profile-photo`, formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (data.success === true) {
            AlertMessage.success(data.message)
            Dispatch(TokenVerify())
        }
        setIsLoading(false)
    }
    const toggleFile = () => {
        fileInputRef.current.click();
    }

    const openForm = () =>{
        formRef.current.classList.add("data-form-active")
    }
    
    const closeForm = () =>{
        formRef.current.classList.remove("data-form-active")
    }

    return (
        <div className='sticky-card'>
            {isLoggedIn === true && (
                <Card className='Profile-Card'>
                    <div className="avatar-sontainer">
                        <Avatar className={isLoading === true ? "avatar-box load-image" : "avatar-box"} alt="Profile" src={UserData.avatar.url} />
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/png, image/gif, image/jpeg, image/webp, image/jpg" multiple={false} onChange={capture} max="2MB"
                        />
                        <Fab color="secondary" className='floating-editor' aria-label="edit" onClick={toggleFile}>
                            <EditIcon />
                        </Fab>
                        <CircularProgress className="loading-ele" style={{ display: isLoading === true ? 'block' : "none" }} />
                    </div>
                    <h2 style={{ textAlign: "center" }}>{UserData.name}</h2>
                    {UserData.about && (
                        <p>{UserData.about.slice(0, 150)}</p>
                    )}
                    <div className="icon-list">
                        {UserData.fb && (
                            <a rel="noreferrer" href={UserData.fb} target='_blank' className='fb'>
                                <FacebookOutlinedIcon />
                            </a>
                        )}
                        {UserData.ig && (
                            <a rel="noreferrer" href={UserData.fb} target='_blank' className='ig'>
                                <InstagramIcon />
                            </a>
                        )}
                        {UserData.tw && (
                            <a rel="noreferrer" href={UserData.fb} target='_blank' className='tw'>
                                <TwitterIcon />
                            </a>
                        )}
                    </div>
                    <Button className='profile-btn' style={{ minWidth: "100%" }} variant="contained" onClick={openForm}><EditIcon /> Edit Profile</Button>
                    <div className="data-form" ref={formRef}>
                        <CloseIcon id="closeForm" onClick={closeForm} />
                        <DetailForm />
                    </div>
                </Card>
            )}
        </div>
    )
}

export default User
