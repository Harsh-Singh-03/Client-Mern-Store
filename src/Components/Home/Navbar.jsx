import { Box, styled, Typography } from '@mui/material';
import { navData } from '../DummyData/data';
import { Link } from 'react-router-dom';
const Component = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  background: #fff;
  padding-bottom: 15px;
  padding-top: 10px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.16);
`;
const InnerComponent = styled(Box)`
  display: flex;
  padding: 0 130px;
  width: calc(100% - 260px);
  max-width: 1600px;
  justify-content: space-between;
`;
const Navbar = (props) => {
    return (
        <Component style={{paddingBottom: props.padding, marginTop: 55}}>
            <InnerComponent>
                {navData.map((data, index) => {
                    return (
                        <Link to={data.link} key={index} className='Nav-Box' style={{display: "grid", placeItems: "center", textDecoration: "none", color: "#000"}}>
                            <img src={data.url} alt="nav-img" style={{ width: 65, display: props.display }} />
                            <Typography style={{ fontSize: 14, fontWeight: 500 }} >{data.text}</Typography>
                        </Link>
                    )
                })}
            </InnerComponent>
        </Component>
    )
}

export default Navbar
