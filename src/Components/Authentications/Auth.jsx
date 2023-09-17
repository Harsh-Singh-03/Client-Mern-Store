import { useDispatch, useSelector } from "react-redux"
import './Auth.css'
import { toggleAuthDisplay } from "../../Actions/UserAction";
import Signup from "./Signup";
import SideBar from "./SideBar";
import Login from "./Login";
import { useState } from "react";
import Forget from "./Forget";

const Auth = () => {
    const Dispatch = useDispatch()
    const { Authview } = useSelector((state) => state.AuthDisplay);
    const [pageView, setPageView] = useState("Sign-In")
    const close = () => {
        Dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY1"))
    }
    const toggleView = (id) =>{
        setPageView(id)
    }
    return (
        <div className={Authview === true ? "Auth-Form Auth-Form-Active" : "Auth-Form"} >
            <div className="Auth-Form-Box">
                <span onClick={close}>X</span>
                <SideBar />
                {pageView === "Sign-In" && (
                    <div className="Auth-Side_form">
                        <Login />
                        <button className="formal-toogle-button" style={{background: "#2874f0", color: "#fff"}} onClick={()=>toggleView("forget-pass")}>Forget Password?</button>
                        <button className="formal-toogle-button" onClick={()=>toggleView("Sign-Up")}>New User? Sign Up</button>
                    </div>
                )}
                {pageView === "Sign-Up" && (
                    <div className="Auth-Side_form" >
                        <Signup />
                        <button className="formal-toogle-button"  onClick={()=>toggleView("Sign-In")}>Have Account?  Log In</button>
                    </div>
                )}
                {pageView === "forget-pass" && (
                    <div className="Auth-Side_form" >
                        <Forget />
                        <button className="formal-toogle-button" onClick={()=>toggleView("Sign-In")}>Back To?  Log In</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Auth
