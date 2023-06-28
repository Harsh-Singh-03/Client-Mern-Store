import { useEffect, useState } from "react"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useDispatch, useSelector } from "react-redux";
import { SignUp, TokenVerify, toggleAuthDisplay } from "../../Actions/UserAction";
import { useAlert } from "react-alert";

const Signup = () => {
  const Dispatch = useDispatch()
  const { data, SignUpSuccess } = useSelector((state) => state.Signup);
  const AlertMessage = useAlert()

  const [AuthData, setAuthData] = useState({ name: "", email: "", password: "" })
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  let formdata = new FormData();

  const afterProcess = async() =>{
    await Dispatch(toggleAuthDisplay("TOGGLE_AUTH_DISPLAY1"))
    await Dispatch(TokenVerify())
    AlertMessage.success(data.message)
  }

  useEffect(() => {
    if(SignUpSuccess === true){
      afterProcess()
    }
    // eslint-disable-next-line
  }, [SignUpSuccess])
  
  const ToggleLabel = (e) => {
    let label = e.target.previousElementSibling
    label.style.transform = "translateY(0px)"
    label.style.top = "-20px"
    label.style.fontSize = "12px"
  }

  const toggleSubmit = (e) => {
    e.preventDefault()
    if (selectedFile !== null) {
      formdata.append("name", AuthData.name);
      formdata.append("email", AuthData.email);
      formdata.append("password", AuthData.password);
      formdata.append("file", selectedFile)
      Dispatch(SignUp(formdata))
    } else {
      AlertMessage.info("Please Upload an avatar")
    }
  }

  const onChange = (e) => {
    setAuthData({ ...AuthData, [e.target.name]: e.target.value })
    let siblingEle = e.target.previousElementSibling
    if(e.target.value !== ""){
      siblingEle.style.transform = "translateY(0px)"
      siblingEle.style.fontSize = "12px"
      siblingEle.style.top = "-20px"
    }

  }

  const capture = (e) => {
    const file = e.target.files[0]
    const maxFileSize = 2 * 1024 * 1024;
    if (file) {
      if(file.size < maxFileSize){
        setSelectedFile(file);
        // Read the file and generate a preview
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }else{
        AlertMessage.error("Check file and its size, max 2mb allowed")
      }
      }
  }

  const handleDelete = () => {
    setSelectedFile(null)
    setImagePreview(null)
    formdata.delete("file")
  }

  return (
    <form className="Sign-up-form" onSubmit={toggleSubmit}>
      <div className="Auth-Input-Box">
        <label htmlFor="" className="Auth-Label" >Enter Your Name</label>
        <input type="text" className="Auth-Input" onInput={onChange} value={AuthData.name} name="name" onFocus={ToggleLabel} minLength={5} />
      </div>
      <div className="Auth-Input-Box">
        <label htmlFor="" className="Auth-Label" >Enter Your Email</label>
        <input type="email" className="Auth-Input" onInput={onChange} name="email" value={AuthData.email} onFocus={ToggleLabel} />
      </div>
      <div className="Auth-Input-Box">
        <label htmlFor="" className="Auth-Label" >Enter Your Password</label>
        <input type="password" className="Auth-Input" onInput={onChange} name="password" value={AuthData.password} onFocus={ToggleLabel} minLength={8} />
      </div>
      <div className="Auth-Input-Box Auth-Input-Box-file">
        <label htmlFor="" className="Auth-Label-File" > <CloudUploadIcon style={{ paddingRight: 10, pointerEvents: "none" }} />Upload an Avatar</label>
        <input type="file" className="Auth-File" name="myImage" accept="image/png, image/gif, image/jpeg, image/webp, image/jpg" multiple={false} onChange={capture} max="2MB" />
        <div style={{ display: "flex", alignItems: "center", width: "100%", marginTop: selectedFile === null ? "0px" : "20px", justifyContent: "space-between" }}>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ width: 'auto', height: '40px' }} />
          )}
          {selectedFile && <> <p className="file-upload-text">File uploaded successfully</p> <RestoreFromTrashIcon onClick={handleDelete} style={{ pointerEvents: "all", zIndex: 5, cursor: "pointer" }} /> </>}
        </div>
      </div>

      <button type="submit" className="Auth-Submit-Button">Create Account</button>
    </form>
  )
}

export default Signup
