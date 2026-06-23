import {Box} from '@mui/material';

import AdminLoginCard from '../../components/admin/AdminLoginCard'
import LoginCard from "../../components/user/LoginCard";



const AdminLogin = () => {
    

    return(
        <Box sx={{minHeight: "100svh",minWidth: '100%', px:2, py:2, display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <AdminLoginCard />
        </Box>
    )
}

export default AdminLogin

