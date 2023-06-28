import { useSelector } from "react-redux"
import Slider from "react-multi-carousel";
import { useState } from "react";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 7
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 5.5
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 5.5
    }
};

const ProductGallery = () => {
    const { product } = useSelector(state => state.newProduct)
    const [ActiveIndex, setActiveIndex] = useState(0)
    let Arr = [product.data.images[0].url, product.data.images[0].url, product.data.images[0].url, product.data.images[0].url, product.data.images[0].url, product.data.images[0].url, product.data.images[0].url, product.data.images[0].url]
    return (
        <div style={{minWidth: "40%", marginRight: "30px", maxWidth: "40%"}}>
            <div style={{ position: "sticky", top: "40px"}}>
            <div className="Product-Banner-Image">
                <img src={Arr[ActiveIndex]} alt="product" />
            </div>
            <div className="Gallery-image-slider">
                <Slider responsive={responsive} autoPlay={false} infinite={false} swipeable={true} draggable={true}>
                    {Arr.map((data, index) => {
                        return (
                            <div className={index === ActiveIndex ? 'product-image product-image-active' : "product-image"} key={index} onClick={() => setActiveIndex(index)} style={{borderLeft: index === 0 ? "none" : "1px solid #f2f2f2"}}>
                                <img src={data} alt="banner" />
                            </div>
                        )
                    })}
                </Slider>
            </div>
         </div>
        </div>
    )
}

export default ProductGallery
