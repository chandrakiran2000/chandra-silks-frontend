import {Box} from '@mui/material';

import LoginCard from "../../components/user/LoginCard";




const Login = () => {
    return(
        <Box sx={{minHeight: "100svh",minWidth: '100%', px:2, py:2, display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', }}>
            <LoginCard />
        </Box>
    )
}

export default Login