import {Box, Stack} from '@mui/material'

import Navbar from "../../components/user/Navbar";
import AdminDashboardCard from '../../components/admin/AdminDashboardCard';
import Loader from '../../components/user/Loader';
import FailureView from '../../components/user/FailureView';

import { Gradient } from '@mui/icons-material';




const AdminDashboard = () => {
    return(
        <Box sx={{minHeight: "100vh",width: '100%'}}>
            <AdminDashboardCard />
        </Box>
    )
}

export default AdminDashboard