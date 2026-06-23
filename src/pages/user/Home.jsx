import {Box} from '@mui/material'

import ProductsCard from '../../components/user/ProductsCard';






const Home = () => {
    
    return(
        <Box sx={{minHeight: "100vh",width: '100%'}}>
            <ProductsCard />
        </Box>
    )
}

export default Home