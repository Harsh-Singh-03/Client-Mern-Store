import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Orders = () => {
    const { isLoggedIn } = useSelector((state) => state.TokenVerify);
    const { customerOrder } = useSelector((state) => state.getCustomerOrders);
    
    return (
        <div className='orderPage'>
          {isLoggedIn === true && (
            <TableContainer component={Paper} style={{ margin: "20px 0px" }}>
             <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                 <TableRow>
                   <TableCell>Order Id</TableCell>
                   <TableCell>Items</TableCell>
                   <TableCell >Price</TableCell>
                   <TableCell>Shipment</TableCell>
                   <TableCell >Payment</TableCell>
                 </TableRow>
               </TableHead>
               <TableBody>
                 {customerOrder.length > 0 && customerOrder.map((row, index) => (
                   <TableRow
                     key={index}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                   >
                     <TableCell component="th" scope="row">
                      <Link to={`/profile/order/${row._id}`}>
                       {row._id}
                       </Link>
                     </TableCell>
                     <TableCell>{row.lineItems.length} Items</TableCell>
                     <TableCell >{row.totalPrice}</TableCell>
                     <TableCell>{row.shipment.shipmentStatus}</TableCell>
                     <TableCell>{row.payment.paymentStatus}</TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </TableContainer>
          )}
        </div>
    )
}

export default Orders
