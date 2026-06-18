import { useEffect, useState } from 'react';
import { Box, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

import AdminCustomerItemCard from "./AdminCustomerItemCard"
import Loader from "../user/Loader"
import FailureView from "../user/FailureView"

import { getAdminAuthConfig } from "../../utils/adminAuth"
import axios from 'axios';


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}



const AdminCustomerCard = () => {
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.success)
    const [customersList, setCustomersList] = useState([])
    const [errorMsg, setErrorMsg] = useState("")

    const getUsers = async() => {
        setApiStatus(apiStatusConstants.inProgress)
        try {
            const response = await axios.get("http://localhost:5000/admin/customers", getAdminAuthConfig())
            const data = response.data
            
            if (data.length === 0){
                setApiStatus(apiStatusConstants.failure)
                setErrorMsg("No customers found")
            } else {
                setCustomersList(data)
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
            getUsers()
        }, [])

    const renderCustomerItems = () => {
        return(
            <TableContainer >
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Id</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Mobile</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#334155" }}>Email Id</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody sx={{overflow: 'auto'}}>
                    {customersList.map(each => (
                    <AdminCustomerItemCard item={each} key={each.id}  />
                    ))}
                </TableBody>
                
                </Table>
            </TableContainer>
        )
    }

    const renderProductDetails = (apiStatus) => {
    
            switch (apiStatus){
                case apiStatusConstants.success:
                    return renderCustomerItems()
                case apiStatusConstants.failure:
                    return <FailureView er={errorMsg}/>
                case apiStatusConstants.inProgress:
                    return <Loader />
                default:
                    null
            }
        }

    return(
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Customers</Typography>
            </Box>
            {renderProductDetails(apiStatus)}
</Box>

    )
}


export default AdminCustomerCard