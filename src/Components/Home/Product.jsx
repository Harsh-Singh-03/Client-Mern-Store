import Slider from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 1600, min: 1200 },
    items: 5,
    slidesToSlide: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2
  }
};
const Product = (props) => {
  return (
    <div className="category-product-dom">
      <div className="Side_Title_Bar" style={{ minWidth: "230px", display: props.sideDisplay }}>
        <span>{props.category}</span>
        <img src={props.image} alt="" />
        <Link to={props.url}>View All</Link>
      </div>
      <div className="product-slider-box">
      <Slider responsive={responsive}  infinite={false} swipeable={true} draggable={false} customTransition="all 1s">
        {props.productData.map((data, index) => {
          return (
            <Link to={`/product/${data._id}`} className='product-box' key={index} style={{textDecoration: "none"}} >
              <img src={data.images[0].url} alt="product"/>
              <p className="title" style={{marginTop: "20px"}}>{data.name.slice(0, 20)} {data.name.length > 20 ? "..." : "" }</p>
              <p className="price">&#8377;{data.price}</p>
              <p className="brand">{data.brand}</p>
            </Link>
          )
        })}       
      </Slider>
      </div>
    </div>
  )
}

export default Product
