import {Box, Stack, Typography} from '@mui/material'
import OrdersCard from '../../components/user/OrdersCard'
import Loader from '../../components/user/Loader';
import FailureView from '../../components/user/FailureView';



const Orders = () => {

    return(
        <Box sx={{minHeight: "100vh",minWidth: '100%', display: 'flex', flexDirection:'row', justifyContent : 'center', px:2, py:2}}>
            <OrdersCard />
        </Box>
    )
}

export default Orders