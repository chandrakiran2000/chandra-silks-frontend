import { useEffect, useState } from 'react';
import {Typography, Box, Grid, Card, CardContent, Avatar, FormControl, InputLabel, Select, MenuItem, TextField} from '@mui/material';
import ProductCard from './ProductCard';
import Loader from './Loader';
import FailureView from './FailureView';
import axios from 'axios';


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProductsCard = () => {
    const [products, setProducts] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [priceRange, setPriceRange] = useState('')

    const [apiStatus, setApiStatus] = useState(apiStatusConstants.success)
    const [errorMsg, setErrorMsg] = useState("")

    const userData = JSON.parse(localStorage.getItem("userData"))
    

    const getProducts = async()=>{
        try {
            setApiStatus(apiStatusConstants.inProgress)
            const response = await axios.get(`https://chandra-silks-backend.onrender.com/products?search=${searchValue}&sort=${priceRange}`)
            const data = response.data
            

            if (data.length === 0){
                setApiStatus(apiStatusConstants.failure)
                setErrorMsg("No products found")
            } else {
                setProducts(data)

                setApiStatus(apiStatusConstants.success)
            }

            
        } catch (error) {
            

            if(error.code === "ERR_NETWORK"){
                setErrorMsg("Unable to connect to server")
            }

            else if(error.response?.status === 500){
                setErrorMsg("Server error. Please try again later")
            }

            else{
                setErrorMsg("Something went wrong")
            }

            setApiStatus(apiStatusConstants.failure)

        }
    }

    useEffect (() => {
        getProducts()
    }, [searchValue, priceRange])
    
    const handleSearch = (event) => {
        setSearchValue(event.target.value)
    }
    const handleChange = (event) => {
        setPriceRange(event.target.value)
    };

    const renderProducts = () => {
        return(
        <Grid container justifyContent='center' alignItems='center' alignSelf='center' spacing={3} columns={12} sx={{maxWidth: 1300, mx: "auto", px: 2,}}>
            {
                products.map(eachproduct => (
                    <Grid item xs={12} sm={6} md={6} lg={4}  xl={3} key={eachproduct.id}>
                        <ProductCard productList={eachproduct} key={eachproduct.id} />
                    </Grid>
                ))
            }
        </Grid>
        )
    }

    const renderProductDetails = (apiStatus) => {
    
            switch (apiStatus){
                case apiStatusConstants.success:
                    return renderProducts()
                case apiStatusConstants.failure:
                    return <FailureView er={errorMsg}/>
                case apiStatusConstants.inProgress:
                    return <Loader />
                default:
                    null
            }
        }

    return(
        <Box sx={{ py: 4, width: "100%"  }}>
            <Typography variant="h1" component="h1" sx={{ color: '#1e293b', fontSize: '28px', fontWeight: 'bold', }} align="center">
                Discover Our Products
            </Typography>
            <Typography align="center" component="p"></Typography>
            <Box sx={{ mt: 3,mb: 4, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexDirection: { xs: "column", md: "column", lg: "row" }}}>
                <TextField
                    placeholder="Search sarees..."
                    size="small"
                    value={searchValue}
                    onChange={handleSearch}
                    sx={{ width: { xs: "70%", md: "40%", lg: "300px" }, borderRadius: '4px', boxShadow: 3, "&:hover": { boxShadow: 6 }, color: '#334155', bgcolor:'#fff', "& .MuiOutlinedInput-root": {"& fieldset": {border: '1px solid #ccc'}, "&:hover fieldset": {border: '1px solid #ccc'}, "&.Mui-focused fieldset": {border: '1px solid #ccc'} }}}
                />
                <FormControl size="small" sx={{borderRadius: '4px',boxShadow: 3, "&:hover": { boxShadow: 6 }, width: { xs: "70%", md: "40%", lg: "200px" }, bgcolor:'#fff', color: '#334155', "& .MuiOutlinedInput-root": {"& fieldset": {border: '1px solid #ccc'}, "&:hover fieldset": {border: '1px solid #ccc'}, "&.Mui-focused fieldset": {border: '1px solid #ccc'},}, "& .MuiInputLabel-root": {color: "#555" }, "& .MuiInputLabel-root.Mui-focused": {color: "#555",} }}>
                    <InputLabel id="sort-label">Sort by price</InputLabel>
                    <Select
                        labelId="sort-label"
                        value={priceRange}
                        label="Sort by price"
                        onChange={handleChange}
                        sx={{}}
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={'ASC'}>Low to High</MenuItem>
                        <MenuItem value={'DESC'}>High to Low</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {renderProductDetails(apiStatus)}
        </Box>
    )
}

export default ProductsCard