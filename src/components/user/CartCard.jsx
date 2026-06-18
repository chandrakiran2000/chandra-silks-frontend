import { useEffect, useState } from 'react';
import {Box, Grid, Typography, CardActions, Button, Stack, Snackbar, Alert} from '@mui/material'
import CartItem from "./CartItem"
import Loader from './Loader';
import FailureView from './FailureView';
import axios from 'axios';

import { getAuthConfig } from "../../utils/auth"


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}



const CartCard = () => {
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [cartItems, setCartItems] = useState([])
    const [errorMsg, setErrorMsg] = useState("")

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success")

    const userData = JSON.parse(localStorage.getItem("userData"))

    const getCartItems = async()=>{
        try {
            setApiStatus(apiStatusConstants.inProgress)
            const response = await axios.get(`http://localhost:5000/cart/${userData.id}`, getAuthConfig())
            const data = response.data
            
            if (data.length === 0){
                setApiStatus(apiStatusConstants.failure)
                setErrorMsg("No cart products found")
            } else {
                setCartItems(data)

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

    useEffect (() => {
        getCartItems()
    }, [])

    const handlePlaceOrder = async() => {
        try {
            const response = await axios.post("http://localhost:5000/orders", {userId: userData.id}, getAuthConfig())
            const data = response.data

            setMessage(data)
            setSeverity("success")
            setOpenSnackbar(true)

            setTimeout(() => {
                getCartItems()
            }, 2000)
        } catch (error) {
            setMessage( error.response?.data || "Failed to place order" )
            setSeverity("error")
            setOpenSnackbar(true)
        }
    }

    

    const renderCartItems = () => {
        const totalItems = cartItems.length
        const totalAmount = cartItems.reduce((total, eachItem) => total +  (eachItem.price * eachItem.quantity ), 0)
        return(
            <Box sx={{display: "flex", flexDirection: {xs: "column", lg: "row",}, gap: 4, width: "100%", alignItems: "flex-start"}}>

                <Box sx={{ flex: 1, width: "100%", minWidth: 0 }}>
                    <Grid container sx={{width: '100%'}} spacing={2} columns={12}>
                        {
                            cartItems.map(eachcart => (
                                <Grid item sx={{width: '100%'}} xs={12} sm={12} md={12} lg={12} xl={12} key={eachcart.id}>
                                    <CartItem cartList={eachcart} getCartItems={getCartItems} key={eachcart.cart_id} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
                
                <Box sx={{ width: "100%", maxWidth: {xs: "100%",lg: "350px"},minWidth: {lg: "350px"}, flexShrink: 0,bgcolor: "#fff",p: { xs: 2, md: 3 },borderRadius: 4,boxShadow: "0 4px 12px rgba(0,0,0,0.08)",position: {xs: "static", lg: "sticky" },top: 100,}}>
                    <Typography sx={{fontSize: {xs: "18px",sm: "22px",md: "24px"},fontWeight: 700,mb: 3,color: "#171f46",}}>
                    Order Summary
                    </Typography>

                    <Box sx={{display: "flex",justifyContent: "space-between",mb: 2,}}>
                    <Typography>Items ({totalItems})</Typography>
                    <Typography>₹ {totalAmount}</Typography>
                    </Box>

                    <Box sx={{display: "flex",justifyContent: "space-between",mb: 2,}}>
                    <Typography>Delivery</Typography>
                    <Typography color="success.main">Free</Typography>
                    </Box>

                    <Box sx={{borderTop: "1px solid #e5e7eb",pt: 2,mt: 2,display: "flex",justifyContent: "space-between",}}>
                    <Typography fontWeight={700}>Total</Typography>
                    <Typography fontWeight={700}>₹ {totalAmount}</Typography>
                    </Box>

                    <Button onClick={handlePlaceOrder} variant="contained" fullWidth sx={{mt: 3,backgroundColor: "#facc15",color: "#000",fontWeight: "bold","&:hover": {backgroundColor: "#eab308",},}}>
                        PLACE ORDER
                    </Button>
                </Box>
            </Box>
        )
    }
    const renderProductDetails = (apiStatus) => {
    
            switch (apiStatus){
                case apiStatusConstants.success:
                    return renderCartItems()
                case apiStatusConstants.failure:
                    return <FailureView er={errorMsg}/>
                case apiStatusConstants.inProgress:
                    return <Loader />
                default:
                    null
            }
        }
    return(
        <>
        <Box sx={{width: '90%', py:1}}>
            <Stack spacing={3}>
                <Typography variant="h1" component="h1" sx={{ color: '#1e293b', fontSize: '24px', fontWeight: 'bold', }} align="">
                    My Cart
                </Typography>
            </Stack>

            <Box sx={{ py: 2, width: "100%"  }}>
                 {renderProductDetails(apiStatus)}
            </Box>
        </Box>

        <Snackbar open={openSnackbar} autoHideDuration={1000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{vertical: "top",horizontal: "right"}}>
            <Alert severity={severity} variant="filled" sx={{width: "100%"}}>
                {message}
            </Alert>
        </Snackbar>
        </>
    
    )
}

export default CartCard