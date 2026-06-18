import { useState } from 'react'
import {Box, Stack, Card, CardContent, Avatar, Typography, CardMedia, CardActions, Button, Snackbar, Alert} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import { getAuthConfig } from "../../utils/auth"

const CartItem = (props) => {
    const { getCartItems } = props
    const {cart_id, name, price, image_url, quantity} = props.cartList
    
    const [qty, setQty] = useState(quantity)

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success")

    const updateQuantity = async (newQty) => {
        try {
            const response = await axios.put(`https://chandra-silks-backend.onrender.com/cart/${cart_id}`, {quantity: newQty}, getAuthConfig())
            setQty(newQty);

            setMessage(response.data)
            setSeverity("success")
            setOpenSnackbar(true)

            setTimeout(() => {
                getCartItems()
            }, 1000)

            

        } catch (error) {
            if (error.code === "ERR_NETWORK") {
                    setMessage("Unable to connect to server")
                } else {
                    setMessage(
                        error.response?.data || "Something went wrong"
                    )
                }
            setSeverity("error")
            setOpenSnackbar(true)
        }
    }

    const removeCartItem = async() => {
            try {
                const confirmDelete = window.confirm(
                    "Are you sure you want to remove this item from cart?"
                )
    
                if (!confirmDelete) {
                    return
                }
    
                const response = await axios.delete(`https://chandra-silks-backend.onrender.com/cart/${cart_id}`,getAuthConfig())
                const data = response.data
    
                setMessage(data)
                setSeverity("success")
                setOpenSnackbar(true)
                
                setTimeout(() => {
                    getCartItems()
                }, 1000)
    
                
    
    
            } catch (error) {
                if (error.code === "ERR_NETWORK") {
                    setMessage("Unable to connect to server")
                } else {
                    setMessage(
                        error.response?.data || "Something went wrong"
                    )
                }
                setSeverity("error")
                setOpenSnackbar(true)
            }
        }
    
    const increaseQty = () => {
        updateQuantity(qty+1)
    }
    
    const decreaseQty = () => {
        if (qty > 1) {
            updateQuantity(qty - 1)
        }
    }
    return(
        <>
        <Card sx={{padding: {xs: 2, md: 3}, width:"100%", borderRadius: 4, bgcolor: "#ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", "&:hover": { boxShadow: "0 6px 18px rgba(0,0,0,0.15)"}, display: "flex", alignItems: 'center', gap: 2 }}>
            
            
            <CardMedia
                component="img"
                alt={name}
                image={image_url}
                sx={{ width : {xs:'90px', md: '120px'}, height: {xs:'120px', md: '120px'}, borderRadius: "2px", objectFit: "cover", flexShrink: 0 }}
            />
            
            
            
            
            <Box sx={{flex: 1 , ml: { xs: 2, md: 3 }, display: "flex", flexDirection: {xs: 'column', md: 'row'}, justifyContent: "space-between", alignItems: {xs:'flex-start', md: 'center'}, mb: 0.5}}>
                <CardContent>
                    <Typography sx={{ fontSize: { xs: "14px", md: "18px" },color: "#171f46", flex: 1, }}>
                        {name}
                    </Typography>

                    <Box sx={{display: 'flex', alignItems:'center', gap: 1, }}>
                        <IconButton  onClick={decreaseQty}>
                            <RemoveIcon sx={{width: "20px"}}/>
                        </IconButton>

                        <Typography sx={{ fontWeight: 350, fontSize: { xs: "14px", md: "16px" } }}>{quantity}</Typography>

                        <IconButton onClick={increaseQty}>
                            <AddIcon sx={{width: "20px"}}/>
                        </IconButton>
                    </Box>
                </CardContent>
                
                <Typography sx={{fontSize: { xs: "14px", md: "16px" }, color: '#171f46', fontWeight: 600, gap: 2, maxWidth: "150px",  ml: {xs:"17px", md: "-1px"}}}>
                    ₹ {price * quantity}
                </Typography>
                <IconButton onClick={removeCartItem} sx={{color: "#ef4444",}}> <HighlightOffIcon /> </IconButton>

            </Box>

        </Card>

        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{vertical: "top",horizontal: "right"}}>
            <Alert severity={severity} variant="filled" sx={{width: "100%"}}>
                {message}
            </Alert>
        </Snackbar>
        </>
    )
}

export default CartItem