import { Box, Typography } from "@mui/material"

import AdminEditProductPageCard from "../../components/admin/AdminEditProductPageCard"


const AdminEditProductPage = () => {
    return(
        <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700,color: "#1e293b", }}>
                Edit Product
            </Typography>
            
            <AdminEditProductPageCard />
        </Box>
    )
}

export default AdminEditProductPage