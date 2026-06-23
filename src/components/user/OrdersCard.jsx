import { useEffect, useState } from 'react';
import {Box, Grid, Typography, CardActions, Button, Stack, Snackbar, Alert} from '@mui/material'
import OrderItem from './OrderItem'
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



const OrdersCard = () => {
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [orderItems, setOrderItems] = useState([])
    const [errorMsg, setErrorMsg] = useState("")

    const userData = JSON.parse(localStorage.getItem("userData"))

    const getOrderItems = async() => {
        try {
            setApiStatus(apiStatusConstants.inProgress)
            const response = await axios.get(`https://chandra-silks-backend.onrender.com/orders/${userData.id}`, getAuthConfig())
            const data = response.data
            if (data.length === 0){
                setApiStatus(apiStatusConstants.failure)
                setErrorMsg("You haven't placed any order yet")
            } else {
                setOrderItems(data)

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
        getOrderItems()
    }, [])


    const renderOrderItems = () => {
        return(
            <Box sx={{ flex: 1 }}>
            <Grid container sx={{width: '100%'}} spacing={2} columns={12}>
                {
                    orderItems.map(eachcart => (
                        <Grid item sx={{width: '100%'}} xs={12} sm={12} md={12} lg={12} xl={12} key={eachcart.order_items_id}>
                            <OrderItem cartList={eachcart} key={eachcart.id} />
                        </Grid>
                    ))
                }
            </Grid>
            </Box>
        )
    }

    const renderProductDetails = (apiStatus) => {
    
            switch (apiStatus){
                case apiStatusConstants.success:
                    return renderOrderItems()
                case apiStatusConstants.failure:
                    return <FailureView er={errorMsg}/>
                case apiStatusConstants.inProgress:
                    return <Loader />
                default:
                    null
            }
        }
    return(
        <Box sx={{ py: 1, width: "100%"  }}>
            <Stack spacing={3}>
                <Typography variant="h1" component="h1" sx={{ color: '#1e293b', fontSize: '24px', fontWeight: 'bold', }} align="">
                    My Orders
                </Typography>
            </Stack>

            <Box sx={{ py: 2, width: "100%"  }}>
                {renderProductDetails(apiStatus)}
            </Box>
        </Box>
    )
}

export default OrdersCard