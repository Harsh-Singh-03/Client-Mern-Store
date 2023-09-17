import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../Header/Nav';
import { CircularProgress, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toggleAuthDisplay } from '../../Actions/UserAction';
import axios from 'axios';

const Reset = () => {
    const { id, token } = useParams()
    const [count, setCount] = useState(5);
    const [loading, setLoading] = useState(false); 
    const [pass, setPass] = useState("");
    const [countDis, setCountdis] = useState('none');
    const history = useNavigate();
    const alertMessage = useAlert()
    const Dispatch = useDispatch()

    const onChange = (e) => {
        setPass(e.target.value)
    }
    const confirmPass = async () => {
        if (pass.length >= 8) {
            setLoading(true)
            const body = {
                id,
                token,
                password: pass
            }
            const data = await axios.post(`${process.env.REACT_APP_USER_URL}/reset-pass`, body)
            if (data.data.success === true) {
                alertMessage.success(data.data.message)
                setLoading(true)
                setCountdis("block")
            }
            if (data.data.success === false) {
                alertMessage.info(data.data.message)
                setLoading(true)
                setCountdis("block")
            }
        }else{
            alertMessage.info("Password must be 8 charcter long")
        }
    }

    useEffect(() => {
        if (countDis === "block") {
            const countdownInterval = setInterval(() => {
                if (count === 1) {
                    clearInterval(countdownInterval);
                    // Navigate to a new page when the countdown reaches 1
                    history('/');
                    Dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY"))
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
        <>
            <Nav/>
            {loading === false ? 
            <div style={{ margin: "100px auto", maxWidth: 500, display: 'grid', placeItems: "center" }}>
                <TextField style={{marginBottom: 40, width: "100%"}} type="password" id="standard-basic" autoComplete='false' label="New Password" variant="standard" onChange={onChange} />
                <button style={{ maxWidth: 500 }} type="submit" className="Auth-Submit-Button" onClick={confirmPass}>Confirm</button>
            </div>:
            <CircularProgress color="primary" style={{position: "absolute",top:"calc(50% - 20px)",left: "66%",color: "#1976d2"}}/>
            }
            <h1 style={{marginTop: 150, textAlign: "center", display: countDis}}>Countdown: {count}</h1>
        </>
    )
}

export default Reset
