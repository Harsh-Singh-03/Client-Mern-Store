import Navbar from "./Navbar"
import Carousel from "./Carousel"
import Product from "./Product"
import './Home.css'
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../Actions/productAction"
import { useEffect } from "react"
import Homeloader from "./Homeloader"
import Nav from '../Header/Nav';

const Home = () => {
  const Dispatch = useDispatch()
  const { loading, products } = useSelector((state) => state.products);
  useEffect(() => {
    if(products.Mobile === undefined){
      Dispatch(getProducts())
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Nav/>
      <Navbar display= "block" padding="15px" />
      <Carousel />
      {loading === false ? (
        <>
          <Product sideDisplay="flex" category="Top Offers" url="/category/topOffers" productData={products.topOffers} image="/Images/Bg-section.webp" />
          <Product sideDisplay="flex" category="Mobile" url="/category/Mobile" productData={products.Mobile} image="/Images/bg-section1.webp" />
          <Product sideDisplay="flex" category="Fashion" url="/category/Fashion" productData={products.Fashion} image="/Images/Bg-section.webp" />
          <Product sideDisplay="flex" category="Electronics" url="/category/Electronics" productData={products.Electronics} image="/Images/bg-section1.webp" />
          <Product sideDisplay="flex" category="Home" url="/category/Home" productData={products.Home} image="/Images/Bg-section.webp" />
          <Product sideDisplay="flex" category="Appliances" url="/category/Appliances" productData={products.Appliances} image="/Images/bg-section1.webp" />
          <Product sideDisplay="flex" category="Two Wheeler" url="/category/twoWheelers" productData={products.twoWheelers} image="/Images/Bg-section.webp" />
          <Product sideDisplay="flex" category="Grocery" url="/category/Grocery" productData={products.Grocery} image="/Images/bg-section1.webp" />
        </>
      ) : <Homeloader/> }
    </>
  )
}

export default Home
