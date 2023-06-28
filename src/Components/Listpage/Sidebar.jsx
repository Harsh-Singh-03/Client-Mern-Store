import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Slider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getFilterData, getFilterProducts, getQueryValue } from "../../Actions/productAction"
import { useParams } from 'react-router-dom';

function valuetext(value) {
  return `${value}°C`;
}
const Sidebar = () => {
  const Dispatch = useDispatch()
  const { name } = useParams()
  const { loading, data } = useSelector((state) => state.filterKeyData);
  const [value, setValue] = useState([0, 30000]);
  const [query, setQuery] = useState({ category: name })
  const [CheckIndex, setCheckIndex] = useState(-1);
  const [RCheckIndex, setRCheckIndex] = useState(-1);
  const [filterList, setFilterList] = useState([]);
  const [priceChecker, setPriceChecker] = useState(false);
  const [brandChecker, setBrandChecker] = useState(false);
  const [ratingChecker, setRatingChecker] = useState(false);

  let CategoryArr = ['topOffers', 'Mobile', 'Fashion', 'Electronics', 'Appliances', 'twoWheelers', 'Grocery', 'Home']
  let ReviewArr = ["2 & Above", "3 & Above", "4 & Above"]

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPriceChecker(true)
    const lteKey = "price[lte]";
    const gteKey = "price[gte]";
    setQuery({
      ...query,
      [lteKey]: newValue[1],
      [gteKey]: newValue[0]
    })
    let newArr = [...filterList];
    if (priceChecker === true) {
      newArr.forEach((item, index) => {
        if (item.includes("- Rs")) {
          newArr[index] = `Rs ${newValue[0]} - Rs ${newValue[1]}`
          setFilterList(newArr)
        }
      })
    } else {
      setFilterList(filterList.concat(`Rs ${newValue[0]} - Rs ${newValue[1]}`))
    }
  };

  useEffect(() => {
    // Reset Filters After every category change !
    setQuery({ category: name })
    setFilterList([])
    setRCheckIndex(-1)
    setCheckIndex(-1)
    setPriceChecker(false)
    setRatingChecker(false)
    setBrandChecker(false)
    CategoryArr.forEach(Element => {
      if (Element === name) {
        Dispatch(getFilterData({ category: name }))
      }
    })
    // eslint-disable-next-line
  }, [name])

  useEffect(() => {
    CategoryArr.forEach(Element => {
      if (Element === name) {
        Dispatch(getQueryValue(query))
        Dispatch(getFilterProducts(query))
      }
    })
    // eslint-disable-next-line
  }, [query])

  useEffect(() => {
    setValue([0, data.maxPrice])
    // eslint-disable-next-line
  }, [loading])

  const toggleBrandChange = (e, index) => {
    setCheckIndex(index)
    setBrandChecker(true)
    if (CheckIndex !== index) {
      setQuery({ ...query, brand: e.target.name })
      let newArr = [...filterList];
      if (brandChecker === true) {
        newArr.forEach((item, index) => {
          if (item.includes("Brand-")) {
            newArr[index] = `Brand- ${e.target.name}`
            setFilterList(newArr)
          }
        })
      } else {
        setFilterList(filterList.concat(`Brand- ${e.target.name}`))
      }
    }
    else {
      let newArr = [...filterList]
      newArr.forEach((Element, index) => {
        if (Element.includes("Brand-")) {
          newArr.splice(index, 1)
          setFilterList(newArr)
        }
      })
      setCheckIndex(-1)
      setBrandChecker(false)
      const { brand, ...newQuery } = query;
      setQuery(newQuery);
    }
  }

  const toggleRatingChange = (e, index) => {
    setRatingChecker(true)
    const RlteKey = "ratings[lte]";
    const RgteKey = "ratings[gte]";
    if (RCheckIndex !== index) {
      setRCheckIndex(index)
      setQuery({
        ...query, [RlteKey]: 5, [RgteKey]: Number(e.target.name)
      })
      let newArr = [...filterList];
      if (ratingChecker === true) {
        newArr.forEach((item, index) => {
          if (item.includes("Rating-")) {
            newArr[index] = `Rating- ${e.target.name} - 5`
            setFilterList(newArr)
          }
        })
      } else {
        setFilterList(filterList.concat(`Rating- ${e.target.name} - 5`))
      }
    }
    else {
      setRCheckIndex(-1)
      setQuery({ ...query, [RlteKey]: 5, [RgteKey]: 0 })
      setRatingChecker(false)
      let newArr = [...filterList]
      newArr.forEach((Element, index) => {
        if (Element.includes("Rating-")) {
          newArr.splice(index, 1)
          setFilterList(newArr)
        }
      })
    }
  }

  const ClearAllFilter = () => {
    setFilterList([])
    setQuery({ category: name })
    setRCheckIndex(-1)
    setValue([0, data.maxPrice])
    setCheckIndex(-1)
    setPriceChecker(false)
    setRatingChecker(false)
    setBrandChecker(false)
  }

  const ClearFilter = (e, index) => {
    console.log(e.target.innerText.includes("- Rs"))
    if (filterList.length === 1) {
      ClearAllFilter()
    }
    else {
      const newFilterList = [...filterList];
      newFilterList.splice(index, 1);
      setFilterList(newFilterList);
      if (e.target.innerText.includes("Brand-")) {
        setCheckIndex(-1)
        setBrandChecker(false)
        const { brand, ...newQuery } = query;
        setQuery(newQuery);
      }
      if (e.target.innerText.includes("Rating-")) {
        setRCheckIndex(-1)
        setRatingChecker(false)
        const RlteKey = "ratings[lte]";
        const RgteKey = "ratings[gte]";
        setQuery({ ...query, [RlteKey]: 5, [RgteKey]: 0 })
      }
      if (e.target.innerText.includes("- Rs")) {
        setValue([0, data.maxPrice])
        setPriceChecker(false)
        const lteKey = "price[lte]";
        const gteKey = "price[gte]";
        setQuery({ ...query, [lteKey]: data.maxPrice, [gteKey]: 0 })
      }
    }
  }

  return (
    <div className='side-bar'>
      <div className='fliter-boxes' >
        <div className='filter-head'>
          <h4>Filters</h4>
          <span style={{ display: filterList.length > 0 ? "block" : "none" }} onClick={ClearAllFilter}>Clear all</span>
        </div>
        <div className='Filters-List'>
          {filterList.map((data, index) => {
            return (
              <span onClick={(e) => ClearFilter(e, index)} key={index}><em>&#10005;</em> {data}</span>
            )
          })}
        </div>
      </div>
      <div className="Price-filter">
        <h5>Price</h5>
        {loading === true || loading === undefined ?
          <div style={{ display: "grid", placeItems: "center" }}>
            <CircularProgress /></div> :
          <Slider
            style={{ margin: "0 10px", width: "calc(100% - 20px)" }}
            getAriaLabel={() => 'Price range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={data.maxPrice}
            sx={{
              '& .MuiSlider-thumb': {
                color: '#fff',
              },
              '& .MuiSlider-track': {
                color: '#2874f0',
              },
            }}
          />}
      </div>
      <div className='brand-filter'>
        <h5>BRANDS</h5>
        {loading === false ?
          data.Brand.map((brand, index) => {
            return (
              <FormGroup key={index}>
                <FormControlLabel control={<Checkbox size='small' name={brand} onChange={(e) => toggleBrandChange(e, index)} checked={CheckIndex === index ? true : false} />} label={brand} />
              </FormGroup>
            )
          }) :
          <div style={{ display: "grid", placeItems: "center" }}>
            <CircularProgress />
          </div>
        }
      </div>
      <div className="ratings-filter">
        <h5>CUSTOMER RATINGS</h5>
        {ReviewArr.map((data, index) => {
          return (
            <FormGroup key={index}>
              <FormControlLabel control={<Checkbox size='small' name={`${index + 2}`} checked={RCheckIndex === index ? true : false} onChange={(e) => toggleRatingChange(e, index)} />} label={data} />
            </FormGroup>
          )
        })}

      </div>
    </div>
  )
}
export default Sidebar
