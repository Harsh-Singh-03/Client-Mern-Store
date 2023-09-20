import { useEffect } from "react"
import Nav from "../Header/Nav"
import Navbar from "../Home/Navbar"
import './Listpage.css'
import Products from "./Products"
import { useDispatch } from "react-redux"
import { getFilterProducts } from "../../Actions/productAction"
import { useLocation } from "react-router-dom"

const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get('search')
    const Dispatch = useDispatch()
    useEffect(() => {
        Dispatch(getFilterProducts({ search: paramValue }))
        // eslint-disable-next-line
    }, [paramValue])
    
  return (
    <>
      <Nav/>
      <Navbar display="none" padding="10px" />
        <div className="Filter-DOM">
            <Products align="center" page={false} />
        </div>
    </>
  )
}

export default Search
