
import {Box, Typography} from "@mui/material";

const FailureView = (props) => {
    const errorMsg = props.er
    return(
        <Box sx={{px: 3, minHeight: "30vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
            <Typography variant="h6" sx={{ color: "#e2a139", fontWeight: 600 }} align="center">
                {errorMsg}
            </Typography>
        </Box>
    )
}

export default FailureView