import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, FormControlLabel, Modal, TextField } from '@mui/material';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { useAlert } from 'react-alert';
import axios from 'axios';
import { TokenVerify } from '../../Actions/UserAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: "6px",
    border: "none",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const ColorButton = styled(Button)(() => ({
    color: "#fff",
    width: "200px",
    backgroundColor: "#fb641b",
    marginTop: 10,
    '&:hover': {
      backgroundColor: "#f95503",
    },
  }));

  
  
  const Addresses = () => {
      
      const { UserData, isLoggedIn } = useSelector((state) => state.TokenVerify);
      const [newAddress, setNewAddress] = useState({ country: '', city: '', state: '', zip: '', houseName: '', street: '' })
      const [open, setOpen] = useState(false);
      const [SaveDefault, setSaveDefault] = useState(false)
      const [isNew, setIsNew] = useState(false)
      const Alert = useAlert()
      const Dispatch = useDispatch()
      
      const handleOpen = (id) => {
        setOpen(true);
        if(id === "new"){
            setIsNew(true)
        }else{
            setIsNew(false)
        }
     }
      
      const handleClose = () => setOpen(false);

    const captureVal = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value })
    }
    const SaveDef = (e) => {
        setSaveDefault(e.target.checked)
    }
   
    const addNew = () =>{
        setNewAddress({ country: '', city: '', state: '', zip: '', houseName: '', street: '' })
        handleOpen("new")
        setSaveDefault(false)
    }
    
    const editToggle = (data) =>{
        setNewAddress(data);
        setSaveDefault(data.isDefault);
        handleOpen("edit")
    }

    const deleteAdd = async(id, isDefault) =>{
        let body = {id, isDefault}
        const { data } = await axios.post(`${process.env.REACT_APP_USER_URL}/delete-address`, body);
        if(data){
            if(data.success === true){
                Alert.success("Address Deleted!")
                Dispatch(TokenVerify())
            }
        }
        else{
            Alert.error("some error occured!")
        }
    }

    const submitForm = async() =>{
        if(isNew === true){
            let body = newAddress
            body.isDefault = SaveDefault
            console.log(body)
            const { data } = await axios.post(`${process.env.REACT_APP_USER_URL}/add-user-address`, body);
            if(data){
                if(data.success === true){
                    Alert.success("Address added")
                    handleClose()
                    Dispatch(TokenVerify())
                }
            }
            else{
                Alert.error("some error occured!")
            }
        }else{
            let body = newAddress
            body.isDefault = SaveDefault
            
            const { data } = await axios.post(`${process.env.REACT_APP_USER_URL}/update-address`, body);
            if(data){
                if(data.success === true){
                    Alert.success("Address updated")
                    handleClose()
                    Dispatch(TokenVerify())
                }
            }
            else{
                Alert.error("some error occured!")
            }
        }
    }

    return (
        <div className='address-page'>
            {isLoggedIn === true && (
                UserData.Addresses.map((Address, index) => {
                    return (
                        <Card className={Address.isDefault === true ? "add-card add-card-default" : "add-card add-card-bg"} key={index}>
                            <CardHeader className='card-header'
                                avatar={
                                    <Avatar aria-label="recipe" alt="profile" src={UserData.avatar.url}>

                                    </Avatar>
                                }
                                title={UserData.name}
                            />
                            <CardContent className='card-content'>
                                <h4>{Address.country}, {Address.state}, {Address.city}</h4>
                                <p>{Address.street}</p>
                                {Address.houseName && <p>{Address.houseName}</p>}
                                <span>{Address.zip}</span>
                            </CardContent>
                            <CardActions style={{ justifyContent: "flex-end", marginBottom: 5 }}>
                                <Button style={{ color: "#fb641b", fontWeight: 600 }} size="small" onClick={()=> editToggle(Address)}><BorderColorIcon /></Button>
                                <Button style={{ color: "red", fontWeight: 600 }} size="small" onClick={()=>deleteAdd(Address.addressId, Address.isDefault)}><DeleteIcon /></Button>
                            </CardActions>
                        </Card>
                    )
                })

            )}
            {isLoggedIn === true && (
                <Card className='add-card' style={{ justifyContent: "center", alignItems: "center", cursor: "pointer", background: "#2874f010" }} onClick={addNew}>
                    <CardContent className='card-content' style={{ display: "grid", placeItems: "center" }}>
                        <AddCircleIcon style={{ minWidth: 80, height: "auto", fill: "#1976d2" }} />
                        <h3>Add New Address</h3>
                    </CardContent>
                </Card>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            
            >
                <Box sx={style}>
                    <CloseIcon onClick={handleClose} className='close-icon' style={{ position: "absolute", right: "-50px", cursor: 'pointer', top: 0, color: "#fff", fontSize: "35px"}} />
                    <div className='add-from' style={{display: "grid", placeItems: "center"}}>
                        <TextField id="standard-basic-country" className='input-address' name='country' value={newAddress.country} label="Country :" variant="standard" onChange={captureVal} />
                        <TextField id="standard-basic" className='input-address' name='street' value={newAddress.street} label="Address :" variant="standard" onChange={captureVal} />
                        <TextField id="standard-basic1" className='input-address' name='houseName' value={newAddress.houseName} label="Appartment/House (Optional) :" variant="standard" onChange={captureVal} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                            <TextField id="standard-basic-state" name='state' className='input-select' value={newAddress.state} label="State :" variant="standard" onChange={captureVal} />
                            <TextField id="standard-basic-city" name='city' className='input-select' value={newAddress.city} label="City :" variant="standard" onChange={captureVal} />
                            <TextField type='number' id="standard-basic-number" name='zip' value={newAddress.zip} className='input-select' label="Pin :" variant="standard" style={{ marginRight: "0px" }} onChange={captureVal} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" , marginTop: 10}} className='toggle-button'>
                            <FormControlLabel control={<Checkbox />} checked={SaveDefault} label="Set as Default" onChange={SaveDef} />
                        </div>
                        <ColorButton onClick={submitForm}>Submit</ColorButton>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Addresses
