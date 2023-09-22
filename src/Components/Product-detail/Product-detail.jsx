import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleProduct } from "../../Actions/productAction";
import { CircularProgress } from "@mui/material";
import ProductGallery from "./ProductGallery";
import './productDetail.css'
import Navbar from "../Home/Navbar";
import Feature from "./Feature";
import Nav from "../Header/Nav";

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, isProduct, product } = useSelector(state => state.newProduct)

  useEffect(() => {
    if (id) {
      let data = { id }
      dispatch(GetSingleProduct(data))
    }
    else {
      alert('something went wrong')
      navigate('/')
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (isProduct === true && product.data._id === id) {
      let localArr = JSON.parse(localStorage.getItem('recent')) || [];
      if(localArr.length !== 0 && localArr.length <= 8){
        const idExists = localArr.some(item => item._id === id);
        if(!idExists){
          localArr.unshift(product.data)
          localStorage.setItem('recent', JSON.stringify(localArr));
        }else{
          localStorage.setItem('recent', JSON.stringify(localArr));
        }
      }
      else if(localArr.length !== 0 && localArr.length > 8){
        const idExists = localArr.some(item => item._id === id);
        if(!idExists){
          localArr.pop()
          localArr.unshift(product.data)
          localStorage.setItem('recent', JSON.stringify(localArr));
        }
      }
      else{
        localArr.unshift(product.data)
        localStorage.setItem('recent', JSON.stringify(localArr));
      }
    }
    // eslint-disable-next-line
  }, [isProduct])



  return (
    <div>
      {loading === false ?
        isProduct === true && (
          <>
            <Nav/>
            <Navbar display="none" padding="10px" />
            <div className="product-landingSections">
              <ProductGallery />
              <Feature />
            </div>
          </>
        ) : <CircularProgress style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />}
    </div>
  )
}

export default ProductDetail
