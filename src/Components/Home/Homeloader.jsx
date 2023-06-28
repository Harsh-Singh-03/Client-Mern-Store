import { Card, Skeleton } from "@mui/material";
import Slider from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
const Homeloader = () => {
  const productArr=[1,2,3,4,5,6]
  return (
    <div className="category-product-dom">
      <div style={{ minWidth: "230px" }}>
      </div>
      <div className="product-slider-box">
      <Slider responsive={responsive}  infinite={false} swipeable={true} draggable={false} customTransition="all 1s">
        {productArr.map((data, index) => {
          return (
            <Card className='product-box' key={index} style={{boxShadow: "none"}}>
              <Skeleton variant="rectangular" width="200px" height="200px"></Skeleton>
              <Skeleton  width="200px"></Skeleton>
              <Skeleton  width="200px" ></Skeleton>
              <Skeleton  width="200px" ></Skeleton>

            </Card>
          )
        })}       
      </Slider>
      </div>
    </div>
  )
}

export default Homeloader
