import { useDispatch, useSelector } from "react-redux"
import { Card, CardActionArea, CardContent, CardMedia, Pagination, PaginationItem, Skeleton, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getFilterProducts } from "../../Actions/productAction"
// import { getFilterProducts } from "../../Actions/productAction"

const Products = () => {
  // const Navigate = useNavigate() 
  const Dispatch = useDispatch()
  const [currentPage, setcurrentPage] = useState(1)
  const { products, loading } = useSelector((state) => state.filters);
  const { queryVal } = useSelector((state) => state.queryval);
  const HandleChange = (e, page) => {
    setcurrentPage(page)
    let tempQuery =  {
      ...queryVal,
      page
    }
    Dispatch(getFilterProducts(tempQuery))
  }
  useEffect(() => {
    setcurrentPage(1)
    // eslint-disable-next-line
  }, [queryVal])
  
  let LoadArr = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <div className="product-list-page">
      <div className="product-list">
        {loading === false ? products.products.map((data, index) => {
          return (
            <Link to={`/product/${data._id}`} style={{ textDecoration: "none" }} key={index}>
              <Card className="product-card">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    className="product-card-media"
                    image={data.images[0].url}
                    alt="product"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.name.slice(0, 20)} {data.name.length > 20 ? "..." : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.description.slice(0, 80)} {data.description.length > 80 ? "..." : ""}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          )
        }) : LoadArr.map((date, index) => {
          return (
            <Card className='product-box' key={index} style={{ boxShadow: "none", minWidth: 290, margin: "20px 5px" }}>
              <Skeleton variant="rectangular" width="290px" height="200px"></Skeleton>
              <Skeleton width="290px"></Skeleton>
              <Skeleton width="100px" ></Skeleton>
            </Card>
          )
        })}
      </div>
      {loading === false ?<Pagination
        count={products.productsCount === undefined ? 1 : Math.ceil(products.productsCount / 8)}
        page={currentPage}
        onChange={(event, page) => HandleChange(event, page)}
        renderItem={(item) => (
          <PaginationItem
            {...item}
          />
        )}
      />: <></>}
    </div>
  )
}

export default Products
