import Nav from "../Header/Nav"
import Navbar from "../Home/Navbar"
import './Listpage.css'
import Products from "./Products"
import Sidebar from "./Sidebar"

const Mainpage = () => {
  return (
    <>
      <Nav/>
      <Navbar display="none" padding="10px" />
      <div className="Filter-DOM">
        <Sidebar/>
        <Products align="flex-start" page={true} />
      </div>
    </>
  )
}

export default Mainpage
