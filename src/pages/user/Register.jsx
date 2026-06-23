import {Box} from '@mui/material';

import RegisterCard from "../../components/user/RegisterCard";

const Register = () => {
    return(
        <Box sx={{minHeight: "100svh",minWidth: '100%', px:2, py:2, display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
            <RegisterCard />
        </Box>
    )
}

export default Register