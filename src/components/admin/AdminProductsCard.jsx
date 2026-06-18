import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AdminProductsItemCard from "./AdminProductsItemCard"
import Loader from "../user/Loader"
import FailureView from "../user/FailureView"

import { getAdminAuthConfig } from "../../utils/adminAuth"




const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}


const AdminProductsCard = () => {
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [productsList, setProductsList] = useState([])
    const [errorMsg, setErrorMsg] = useState("")

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("success")

    const navigate = useNavigate()

    const getProducts = async()=>{
        try {
            setApiStatus(apiStatusConstants.inProgress)
            
            const response = await axios("https://chandra-silks-backend.onrender.com/admin/products/", getAdminAuthConfig())
            
            setProductsList(response.data)
            setApiStatus(apiStatusConstants.success)
        } catch (error) {
            setErrorMsg(error)
            setApiStatus(apiStatusConstants.failure)
        }
    }
    
    useEffect(()=>{
        getProducts()
    }, [])

    const renderProducts = () => {
        return(
            <TableContainer >
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Image</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody sx={{overflow: 'auto'}}>
                    {productsList.map(each => (
                    <AdminProductsItemCard item={each} key={each.id} getProducts={getProducts} setMessage={setMessage} setSeverity={setSeverity} setOpenSnackbar={setOpenSnackbar}/>
                    ))}
                </TableBody>
                
                </Table>
            </TableContainer>
        )
    }

    const renderProductDetails = (apiStatus) => {
    
            switch (apiStatus){
                case apiStatusConstants.success:
                    return renderProducts()
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
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Products</Typography>
                <Button onClick={() => navigate("/admin/add-product")} variant="contained" sx={{ bgcolor: "#facc15", color: "#000" }}>
                Add Product
                </Button>
            </Box>

            {renderProductDetails(apiStatus)}
        </Box>

        <Snackbar
                  open={openSnackbar}
                  autoHideDuration={2500}
                  onClose={() => setOpenSnackbar(false)}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Alert
                    severity={severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {message}
                  </Alert>
                </Snackbar>
        </>

    )
}

export default AdminProductsCard