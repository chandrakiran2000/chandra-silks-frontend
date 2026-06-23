import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid, Snackbar,Alert
} from "@mui/material";
import axios from "axios";

import Loader from './Loader';
import FailureView from './FailureView';
import RelatedProductCard from "./RelatedProductCard";
import { getAuthConfig } from "../../utils/auth"

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}


const ProductDetailsCard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [apiStatus, setApiStatus] = useState (apiStatusConstants.initial)
    const [productData, setProductData] = useState([])
    const [relatedProductsData, setRelatedProductsData] = useState([])
    const [errorMsg, setErrorMsg] = useState("")

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackbarMsg, setSnackbarMsg] = useState("")
    const [severity, setSeverity] = useState("success")

    const userData = JSON.parse(localStorage.getItem("userData"))

  const getProductDetails = async () => {
    try {
        setApiStatus(apiStatusConstants.inProgress)
        const response = await axios.get(`https://chandra-silks-backend.onrender.com/products/${id}/related`)
        console.log(response.data)
        setProductData(response.data.product)
        setRelatedProductsData(response.data.relatedProducts)
        setApiStatus(apiStatusConstants.success)

    } catch (error) {
        console.log(error)
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
    getProductDetails();
  }, [id])

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

  const renderProduct = () => {
    return(
        <>
            <Paper
                elevation={2}
                sx={{
                p: 3,
                display: "flex",
                flexDirection: {
                    xs: "column",
                    md: "row",
                },
                
                gap: 4,
                borderRadius: 3,
                }}
            >
                {/* IMAGE */}

                <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                }}
                >
                <Box
                    component="img"
                    src={productData.image_url}
                    alt="product"
                    sx={{
                    width: "100%",
                    maxWidth: "450px",
                    borderRadius: 2,
                    objectFit: "cover",
                    }}
                />
                </Box>

                {/* DETAILS */}

                <Box
                sx={{
                    flex: 1,
                }}
                >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    gutterBottom
                >
                    {productData.name}
                </Typography>

                <Typography
                    sx={{
                    color: "#64748b",
                    mb: 2,
                    }}
                >
                    Pure Silk Saree
                </Typography>

                <Typography
                    sx={{
                    color: "#475569",
                    lineHeight: 1.8,
                    }}
                >
                    {productData.description}
                </Typography>

                <Typography
                    sx={{
                    mt: 3,
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#111827",
                    }}
                >
                    ₹ {productData.price}
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleAddToCart}
                    fullWidth
                    sx={{
                    mt: 3,
                    py: 1.5,
                    color: "#000",
                    backgroundColor: "#facc15",
                    fontWeight: 700,
                    "&:hover": {backgroundColor: "#eab308"}
                    }}
                >
                    Add To Cart
                </Button>
                </Box>
            </Paper>

            <Paper
                elevation={1}
                sx={{
                mt: 4,
                p: 3,
                borderRadius: 3,
                }}
            >
                <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                >
                Product Details
                </Typography>

                <Typography>
                <strong>Size & Fit</strong>
                </Typography>

                <Typography>
                    - Saree: 6 Mtrs
                </Typography>

                <Typography>
                    - Blouse: 1 Mtr
                </Typography>

                <br />

                <Typography>
                <strong>Fabric</strong>
                </Typography>

                <Typography>
                - Pure Silk
                </Typography>

                <br />

                <Typography>
                <strong>Wash Care</strong>
                </Typography>

                <Typography>
                - Dry Wash Only
                </Typography>
                <Typography>
                - Medium iron if needed
                </Typography>
                
                <br />

                <Typography>
                <strong>Disclamier</strong>
                </Typography>

                <Typography>
                - Product may slightly vary due to photographic lighting source or device settings
                </Typography>
                
            </Paper>
            
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    mt: 4,
                    borderRadius: 3,
                    overflow: "hidden",
                }}
                >
                <Typography
                    variant="h5"
                    sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: "#171f46",
                    }}
                >
                    Related Products
                </Typography>

                <Box
                    sx={{
                    width: "100%",
                    overflowX: "auto",
                    overflowY: "hidden",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {display: "none",}
                    }}
                >
                    <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        width: "max-content",
                        pb: 2,

                        "&::-webkit-scrollbar": {
                        height: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#d1d5db",
                        borderRadius: "10px",
                        },
                    }}
                    >
                    {relatedProductsData.map((product) => (
                        <RelatedProductCard
                        key={product.id}
                        product={product}
                        />
                    ))}
                    </Box>
                </Box>
            </Paper>
        </>
    )
  }


  const renderProductDetails = (apiStatus) => {
    
    switch (apiStatus){
    case apiStatusConstants.success:
        return renderProduct()
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
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {renderProductDetails(apiStatus)}
    </Box>
    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{vertical: "top",horizontal: "right"}}>
        <Alert onClose={handleCloseSnackbar} severity={severity} variant="filled" sx={{width: "100%"}}>
            {snackbarMsg}
        </Alert>
    </Snackbar>
    </>
  );
};

export default ProductDetailsCard;