import { useDispatch, useSelector } from "react-redux"
import { SignIn, TokenVerify, toggleAuthDisplay } from "../../Actions/UserAction"
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useAlert } from "react-alert";

const Login = () => {
  const Dispatch = useDispatch()
  const { data, SignInSuccess, loading } = useSelector((state) => state.SignIn);
  const AlertMessage = useAlert()
  const [AuthData, setAuthData] = useState({ email: "", password: "" })

  const afterProcess = async () => {
    await Dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY1"))
    await Dispatch(TokenVerify())
    AlertMessage.success(data.message)
  }

  useEffect(() => {
    if(SignInSuccess === true){
      afterProcess()
    }
    // eslint-disable-next-line
  }, [SignInSuccess])

  const ToggleLabel = (e) => {
    let label = e.target.previousElementSibling
    label.style.transform = "translateY(0px)"
    label.style.top = "-20px"
    label.style.fontSize = "12px"
  }

  const toggleSubmit = async (e) => {
    e.preventDefault()
    await Dispatch(SignIn(AuthData))
  }

  const onChange = (e) => {
    setAuthData({ ...AuthData, [e.target.name]: e.target.value })
    let siblingEle = e.target.previousElementSibling
    if (e.target.value !== "") {
      siblingEle.style.transform = "translateY(0px)"
      siblingEle.style.fontSize = "12px"
      siblingEle.style.top = "-20px"
    }
  }


  return (
    <>
    {loading === false ?
      <form className="Sign-up-form" onSubmit={toggleSubmit}>
        <div className="Auth-Input-Box">
          <label htmlFor="" className="Auth-Label" >Enter Your Email</label>
          <input type="email" className="Auth-Input" onInput={onChange} name="email" value={AuthData.email} onFocus={ToggleLabel} />
        </div>
        <div className="Auth-Input-Box">
          <label htmlFor="" className="Auth-Label" >Enter Your Password</label>
          <input type="password" className="Auth-Input" onInput={onChange} name="password" value={AuthData.password} onFocus={ToggleLabel} minLength={8} />
        </div>

        <button type="submit" className="Auth-Submit-Button">LOG IN</button>
      </form>
    : <CircularProgress color="primary" style={{position: "absolute",top:"calc(50% - 20px)",left: "66%",color: "#1976d2"}}/>}
    </>
  )
}

export default Login
