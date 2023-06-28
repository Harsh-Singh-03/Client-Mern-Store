import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Alert } from '@mui/material';
import { useState } from 'react';
import { CheckoutProcess, ToggleCartPage } from '../../Actions/CartAction';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:
        'linear-gradient( 95deg,#ff9f00 0%,rgb(233,64,87) 50%,#fb641b 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:
        'linear-gradient( 95deg,#ff9f00 0%,rgb(233,64,87) 50%,#fb641b 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    background:
      '#ff9f0090',
    boxShadow: '1px 2px 2px 0 rgba(0, 0, 0, .16)',
  }),
  ...(ownerState.completed && {
    background:
      '#fb641b',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ShoppingCartIcon />,
    2: <LocalShippingIcon />,
    3: <PaymentIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Cart', 'Shipping', 'Payment'];

export default function ProcessBar() {
  const { processCount } = useSelector((state) => state.CheckoutProcess)
  const [info, setInfo] = useState("flex")
  const Dispatch = useDispatch()
  const AlertMessage = useAlert()
  const Navigate = useNavigate()

  React.useEffect(() => {
    setTimeout(() => {
      setInfo("none")
    }, 10000);
  }, [])
  const changeStep = (i) =>{
    if(i === 1){
      Dispatch(CheckoutProcess("PROCESS_DETAIL"))
    }
    if(i === 2){
      AlertMessage.info("Complete process and click checkout for move further!")
    }
    if(i === 0){
      Navigate('/')
      Dispatch(ToggleCartPage("CART_OPEN"))
    }
  }
  return (
    <>
      <Alert onClose={() => {setInfo("none")}} severity="info" style={{display: info}}> <strong>NOTE :</strong> Please don't reload the page during checkout!</Alert>
      <Stack className='processBar-section' spacing={4}>
        <Stepper alternativeLabel activeStep={processCount} connector={<ColorlibConnector />}>
          {steps.map((label, index) => (
            <Step key={index} className='step-label' onClick={()=>changeStep(index)} style={{cursor: processCount > index ? "pointer" : "auto"}}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </>
  );
}