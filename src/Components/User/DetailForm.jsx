import { TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { TokenVerify } from '../../Actions/UserAction';

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#fb641b"),
    backgroundColor: "#fb641b",
    width: "100%",
    height: "100%",
    '&:hover': {
      backgroundColor: "#f95503",
    },
  }));

const DetailForm = () => {

    const { UserData, isLoggedIn } = useSelector((state) => state.TokenVerify);
    const [StoreData, setStoreData] = useState({name: UserData.name, email: UserData.email, about: UserData.about, ig: UserData.ig, tw: UserData.tw , fb : UserData.fb })
    const Alert = useAlert()
    const Dispatch = useDispatch()

    useEffect(() => {
        if(isLoggedIn === true){
            setStoreData({name: UserData.name, email: UserData.email, about: UserData.about, ig: UserData.ig, tw: UserData.tw , fb : UserData.fb })
        }
        // eslint-disable-next-line
    }, [isLoggedIn])

    const captureVal = (e) =>{
        setStoreData({ ...StoreData, [e.target.name]: e.target.value })
    }

    const update = async ()=>{
        const { data } = await axios.post(`${process.env.REACT_APP_USER_URL}/update-profile`, StoreData);
        if(data.success === true){
            Alert.success(data.message)
            Dispatch(TokenVerify())
        }
    }

    return (
        <div className='User-Form'>
            {isLoggedIn === true && (
                <>
                    <div className="form-ele">
                        <TextField onChange={captureVal} className='input-user' name='name' value={StoreData.name} label="Name :" variant="standard" />
                        <TextField onChange={captureVal} className='input-user' name='email' value={StoreData.email} label="Email :" variant="standard" />
                        <TextField
                            onChange={captureVal}
                            label="About"
                            multiline
                            name='about'
                            rows={2}
                            value={StoreData.about ? StoreData.about : ""}
                            className='input-user'
                        />
                        <TextField onChange={captureVal} className='input-user' name='fb' value={StoreData.fb ? StoreData.fb : ""} label="Facebook :" variant="standard" />
                        <TextField onChange={captureVal} className='input-user' name='ig' value={StoreData.ig ? StoreData.ig : ""} label="Instagram :" variant="standard" />
                        <TextField onChange={captureVal} className='input-user' name='tw' value={StoreData.tw ? StoreData.tw : ""} label="Twitter :" variant="standard" />
                    </div>
                    <div className="bottomBtn">
                        <ColorButton onClick={update}>Update Profile</ColorButton>

                    </div>
                </>
            )}
        </div>
    )
}

export default DetailForm
