import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Checkbox, FormControlLabel, Modal, Radio, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import { CheckoutProcess } from '../../Actions/CartAction'
import { addUserAddress } from '../../Actions/UserAction';
import CloseIcon from '@mui/icons-material/Close';
import { createOrder } from '../../Actions/OrderAction';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#fb641b"),
  backgroundColor: "#fb641b",
  width: "300px",
  maxWidth: "400px",
  position: "absolute",
  bottom: "20px",
  left: "calc(50% - 150px)",
  '&:hover': {
    backgroundColor: "#f95503",
  },
}));

const ShippingDetail = () => {
  const [Save, setSave] = useState(false)
  const [SaveDefault, setSaveDefault] = useState(false)
  const [Address, setAddress] = useState({ country: '', city: '', state: '', zip: '', houseName: '', street: '' })
  const { UserData } = useSelector((state) => state.TokenVerify);
  const { CartData } = useSelector((state) => state.CartItems)
  const Dispatch = useDispatch()
  const [Addata, setAddata] = useState({})
  const [showField, setshowField] = useState(true)
  const [btnDisplay, setBtnDisplay] = useState(false)
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (UserData.Addresses.length !== 0) {
      setshowField(false)
      UserData.Addresses.forEach((element, index) => {
        if (element.default === true) {
          setAddata(element)
          setAddress(element)
          return;
        }
        if (index === UserData.Addresses.length - 1) {
          setAddata(UserData.Addresses[0])
          setAddress(UserData.Addresses[0])
        }
      });
    } else {
      setshowField(true)
    }
    // eslint-disable-next-line
  }, [])  

  const changeProcess = async () => {
    if (Save !== true && SaveDefault !== true) {
      Dispatch(CheckoutProcess("PROCESS_PAYMENT"))
    }
    else {
      let storeAdd = Address
      storeAdd.isDefault = SaveDefault
      Dispatch(CheckoutProcess("PROCESS_PAYMENT"))
      Dispatch(addUserAddress(storeAdd))
    }
    let orderData = {
      CartID: CartData._id,
      address: Address
    }
    await Dispatch(createOrder(orderData))
  }
  const saveAdd = (e) => {
    setSave(e.target.checked)
  }
  const SaveDef = (e) => {
    setSaveDefault(e.target.checked)
  }
  const captureVal = (e) => {
    setAddress({ ...Address, [e.target.name]: e.target.value })
  }
  const capAddress = (e, data) =>{
    if(e.target.checked === true){
      setAddata(data)
      setAddress(data)
      setOpen(false)
    }
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='shipping-details-box'>
      <h3>Shipping & Billing Address :</h3>
      {showField === true &&
        <div id='Shipping-detail-form'>
          <TextField id="standard-basic-country" className='input-address' name='country' value={Address.country} label="Country :" variant="standard" onChange={captureVal} />
          <TextField id="standard-basic" className='input-address' name='street' value={Address.street} label="Address :" variant="standard" onChange={captureVal} />
          <TextField id="standard-basic1" className='input-address' name='houseName' value={Address.houseName} label="Appartment/House (Optional) :" variant="standard" onChange={captureVal} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField id="standard-basic-state" name='state' className='input-select' value={Address.state} label="State :" variant="standard" onChange={captureVal} />
            <TextField id="standard-basic-city" name='city' className='input-select' value={Address.city} label="City :" variant="standard" onChange={captureVal} />
            <TextField type='number' id="standard-basic-number" name='zip' value={Address.zip} className='input-select' label="Pin :" variant="standard" style={{ marginRight: "0px" }} onChange={captureVal} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }} className='toggle-button'>
            <FormControlLabel control={<Checkbox />} label="Save Address" onChange={saveAdd} />
            <FormControlLabel control={<Checkbox />} label="Set as Default" onChange={SaveDef} />
            <Button variant="text" style={{ display: btnDisplay === true ? "block" : "none" }} onClick={() => setshowField(false)} >Choose Saved</Button>
          </div>
        </div>
      }
      {showField === false &&
        <>
          <div className='saved-address'>
            <Radio defaultChecked disabled style={{ color: "#2874f0", padding: "0px", marginRight: "10px" }} />
            <div className='address-detail'>
              <p>{Addata.street}</p>
              <span>{Addata.city},</span>
              <span>{Addata.state},</span>
              <span>{Addata.country},</span>
              <span>Pin : {Addata.zip}</span>
            </div>
          </div>
          <div className="options">
            {UserData.Addresses.length > 1 && <Button variant="text" style={{ marginRight: "30px" }} onClick={handleOpen}>Choose Another</Button>}
            <Button variant="text" onClick={() => { setshowField(true); setBtnDisplay(true) }} >Add new</Button>
          </div>
          {UserData.Addresses.length > 1 &&
            <div className='address-book' style={{ position: "relative", display: "grid", placeItems: "center" }}>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modal-address'
              >
                
                {/* Will list address here  */}
                <Box className="modal-content order-detail-list">
                  <CloseIcon onClick = {() => setOpen(false)} className='close-icon-modal'/>
                  {UserData.Addresses.map((data, index) => {
                    return (
                      <div className='saved-address' key={index} style={{margin: 0, marginTop: index === 0 ? 0 : 30}}>
                        <Checkbox  style={{ color: "#2874f0", padding: "0px", marginRight: "10px" }} onChange={(e) =>{capAddress(e, data)}} />
                        <div className='address-detail'>
                          <p>{data.street}</p>
                          <span>{data.city},</span>
                          <span>{data.state},</span>
                          <span>{data.country},</span>
                          <span>Pin : {data.zip}</span>
                        </div>
                      </div>
                    )
                  })}
                </Box>
              </Modal>
            </div>
          }
        </>
      }
      <ColorButton onClick={changeProcess}>Checkout</ColorButton>
    </div>
  )
}

export default ShippingDetail
