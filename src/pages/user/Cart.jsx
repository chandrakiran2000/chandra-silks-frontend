import {Box, Stack, Typography,} from '@mui/material'
import CartCard from '../../components/user/CartCard'
import Loader from '../../components/user/Loader';
import FailureView from '../../components/user/FailureView';



const Cart = () => {

    return(
        <Box sx={{minHeight: "100vh", Width: '100%', display: 'flex', flexDirection:'row', justifyContent : 'center', px:2, py:2}}>
            <CartCard />
        </Box>
    )
}

export default Cart