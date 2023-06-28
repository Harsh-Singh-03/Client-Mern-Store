import React from 'react'
import { bannerData } from '../DummyData/data'
import Slider from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const Carousel = () => {
  return (
    <div className='slider-container'>
      <Slider responsive={responsive} autoPlay={true} autoPlaySpeed={5000} infinite={true}  swipeable={false} draggable={false}>
        {bannerData.map((data, index) => {
          return (
            <div className='banner-image' key={index}>
              <img src={data.url} alt="banner" />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default Carousel
