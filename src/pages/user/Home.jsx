import {Box, Stack} from '@mui/material'

import Navbar from "../../components/user/Navbar";
import ProductsCard from '../../components/user/ProductsCard';
import Loader from '../../components/user/Loader';
import FailureView from '../../components/user/FailureView';

import { Gradient } from '@mui/icons-material';




const Home = () => {
    
    return(
        <Box sx={{minHeight: "100vh",width: '100%'}}>
            <ProductsCard />
        </Box>
    )
}

export default Home