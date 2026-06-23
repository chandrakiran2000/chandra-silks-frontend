
import {Box, Stack, Typography,} from '@mui/material'
import ProductDetailsCard from '../../components/user/ProductDetails'


const ProductDetails = () => {

    return(
        <Box sx={{minHeight: "100vh", Width: '100%', display: 'flex', flexDirection:'row', justifyContent : 'center', px:2, py:2}}>
            <ProductDetailsCard />
        </Box>
    )
}

export default ProductDetails