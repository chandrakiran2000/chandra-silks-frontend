import {Box, Stack, Card, CardContent, Avatar, Typography, CardMedia, CardActions, Button} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const OrderItem = (props) => {
    const {name, price, image_url, quantity} = props.cartList
    
    return(
        <Card sx={{padding: {xs: "18px 28px", md: "24px 36px"}, width: '100%', minWidth: '260px', flexShrink: 1,  borderRadius: 4, bgcolor: "#ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", "&:hover": { boxShadow: "0 6px 18px rgba(0,0,0,0.15)"}, display: "flex", flexDirection: "row", alignItems: 'center' }}>
            
            
            <CardMedia
                component="img"
                alt={name}
                image={image_url}
                sx={{ width : {xs:'150px', md: '96px'}, height: {xs:'160px', md: '96px'}, borderRadius: '4px', objectFit: "cover",  }}
            />
            
            <Box
                sx={{
                    width: "100%",
                    ml: 2,
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                    },
                    alignItems: {xs: "flex-start", sm: "flex-start", md: "center",}, gap: 1,
                }}>
               
                <Typography
                    sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    width: "100%",
                    }}
                >
                    {name}
                </Typography>

                
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                        },
                        justifyContent: {md: "space-between",},
                        alignItems: {
                        xs: "flex-start",
                        sm: "flex-start",
                        md: "space-between",
                        },
                        gap: 1,
                        width: "100%",
                    }}
                    >
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography>Quantity :</Typography>
                        <Typography fontWeight="bold">
                        {quantity}
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                        fontWeight: 600,
                        color: "#171f46",
                        }}
                    >
                        ₹ {price * quantity}
                    </Typography>
                    </Box>
                </Box>

        </Card>
    )
}


export default OrderItem