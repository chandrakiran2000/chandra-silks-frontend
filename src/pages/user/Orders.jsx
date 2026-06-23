import {Box, Stack, Typography} from '@mui/material'
import OrdersCard from '../../components/user/OrdersCard'




const Orders = () => {

    return(
        <Box sx={{minHeight: "100vh",minWidth: '100%', display: 'flex', flexDirection:'row', justifyContent : 'center', px:2, py:2}}>
            <OrdersCard />
        </Box>
    )
}

export default Orders