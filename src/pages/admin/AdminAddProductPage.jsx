import { Box, Typography } from "@mui/material"

import AdminAddProductPageCard from "../../components/admin/AdminAddProductPageCard"


const AdminAddProductPage = () => {
    
    return(
        <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700,color: "#1e293b", }}>
                Add Product
            </Typography>
            
            <AdminAddProductPageCard />
        </Box>
    )
}

export default AdminAddProductPage