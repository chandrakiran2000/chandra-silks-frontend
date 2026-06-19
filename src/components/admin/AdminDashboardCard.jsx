import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AdminOrdersItemCard from "./AdminOrdersItemCard";

import Loader from "../user/Loader"
import FailureView from "../user/FailureView"

import { getAdminAuthConfig } from "../../utils/adminAuth"
import axios from "axios";



const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const AdminDashboardCard = () => {
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [cardsData, setCardsData] = useState([])
    const [topOrders, setTopOrders] = useState([])
    const [errorMsg, setErrorMsg] = useState("")

  const icons = {
      Products: <Inventory2Icon sx={{ fontSize: 40 }} />,
    
      Orders: <ReceiptLongIcon sx={{ fontSize: 40 }} />,
    
      Customers: <PeopleIcon sx={{ fontSize: 40 }} />,
    
      Revenue: <CurrencyRupeeIcon sx={{ fontSize: 40 }} />
    }



  const getDashboardData = async() => {
    setApiStatus(apiStatusConstants.inProgress)
        try {
            const response = await axios.get("https://chandra-silks-backend.onrender.com/admin/dashboard", getAdminAuthConfig())
            const data = response.data
            if (data.length === 0){
                setApiStatus(apiStatusConstants.failure)
                setErrorMsg("No orders found")
            } else {
                setCardsData(data[0].cardsData)
                setTopOrders(data[0].ordersData)
                setApiStatus(apiStatusConstants.success)
            }
        } catch (error) {
            if(error.code === "ERR_NETWORK"){
                setErrorMsg("Unable to connect to server")
            }

            else if(error.response?.status === 500){
                setErrorMsg("Server error. Please try again later")
            }

            else{
                setErrorMsg("Something went wrong")
            }

            setApiStatus(apiStatusConstants.failure)
        }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  const renderCards = () => {
    
    return(
        <>
        <Grid container spacing={3}>
            {cardsData.map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card.title}>
                <Paper
                elevation={3}
                sx={{
                    p: 3,
                    height: "170px",
                    width: "200px",
                    borderRadius: 3,
                    bgcolor: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "0.3s",
                     "&:hover": {transform: "translateY(-4px)", boxShadow: 6,}
                }}
                >
                <Box>
                    <Typography
                    variant="body1"
                    color="text.secondary"
                    >
                    {card.title}
                    </Typography>

                    <Typography
                    variant="h5"
                    fontWeight="bold"
                    mt={1}
                    >
                    {card.total}
                    </Typography>
                </Box>

                <Box sx={{ color: "#e2a139" }}>
                    {icons[card.title]}
                </Box>
                </Paper>
            </Grid>
            ))}
        </Grid>

        <Box sx={{mt:3}}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Recent Orders</Typography>
            </Box>
        
            <TableContainer >
                <Table>
                    <TableHead >
                    <TableRow >
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Qty</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>User</TableCell>
                    </TableRow>                
                </TableHead>
                
                <TableBody sx={{overflow: 'auto'}}>
                    {topOrders.map(each => (
                    <AdminOrdersItemCard item={each} key={each.order_item_id}  />
                    ))}
                </TableBody>
                    
                </Table>
            </TableContainer>
        </Box>
        </>
    )
  }

  const renderDashboardDetails = (apiStatus) => {
        switch (apiStatus){
                case apiStatusConstants.success:
                    return renderCards()
                case apiStatusConstants.failure:
                    return <FailureView er={errorMsg}/>
                case apiStatusConstants.inProgress:
                    return <Loader />
                default:
                    null
            }
        }

  return (
    <>
    <Box sx={{}}>
            <Box sx={{display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Dashboard</Typography>
                
            </Box>
            {renderDashboardDetails(apiStatus)}
    </Box>
    </>
  );
};

export default AdminDashboardCard;