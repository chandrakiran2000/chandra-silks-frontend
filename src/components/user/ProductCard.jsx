import { useState } from 'react'
import {Box, Stack, Card, CardContent, Avatar, Typography, CardMedia, CardActions, Button} from '@mui/material'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from 'axios';

import { getAuthConfig } from "../../utils/auth"


const ProductCard = (props) => {
    const {id, name, price, description, image_url} = props.productList

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMsg, setSnackbarMsg] = useState("")
    const [severity, setSeverity] = useState("success")

    const userData = JSON.parse(localStorage.getItem("userData"))

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false)
    }

    const handleAddToCart = async () => {
        try {
            const productData = {"userId": userData.id, productId: id, "quantity" : 1}
            const response = await axios.post("https://chandra-silks-backend.onrender.com/cart", productData, getAuthConfig())

            setSnackbarMsg(response.data)
            setSeverity("success")
            setOpenSnackbar(true)
        } catch (error) {
            setSnackbarMsg(error.response?.data || "Something went wrong")
            setSeverity("error")
            setOpenSnackbar(true)
        }
    }
    return(
        <>
        <Card sx={{p: 2,width: "100%", maxWidth: 300,  minHeight: 420, flexShrink: 1,  borderRadius: 4, bgcolor: "#ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", "&:hover": { boxShadow: "0 6px 18px rgba(0,0,0,0.15)"}, display: "flex", flexDirection: "column"}}>
            <CardMedia
                component="img"
                alt={name}
                image={image_url}
                sx={{ width: "100%", height: 250, borderRadius: "12px", objectFit: "cover",  }}
            />
            
            <CardContent sx={{flexGrow: 1, px: 1, py: 1,}}>
                <Typography variant="h6" align="start" sx={{ mt: 1.5, mb: 0.5, fontSize: "20px", fontFamily: "'Poppins', sans-serif", fontWeight: 300, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {name}
                </Typography>
                <Typography variant="body2" align="start" sx={{ mt: 0.5, mb: 2, fontSize: "16px", fontFamily: "'Roboto', sans-serif", color: "#6b7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>
                   {description}
                </Typography>
                <Typography variant="body2" align="start" sx={{ mt: 0.5, mb: 1, fontSize: "20px", fontFamily: "'Poppins', sans-serif", fontWeight: 350, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <strong>₹ {price}</strong>
                </Typography>
            </CardContent>
            
            <CardActions sx={{ justifyContent: "center", pt:0, pb: 1}}>
                <Button onClick={handleAddToCart} variant="contained" size="small" sx={{width: "100%", backgroundColor: "#facc15", color: "#000", fontWeight: "bold", "&:hover": {backgroundColor: "#eab308"}}}>Add to Cart</Button>
            </CardActions>
        </Card>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: "top",horizontal: "right"}}>
            <Alert onClose={handleCloseSnackbar} severity={severity} variant="filled" sx={{width: "100%"}}>
                {snackbarMsg}
            </Alert>
        </Snackbar>
        </>
    )
}

export default ProductCard