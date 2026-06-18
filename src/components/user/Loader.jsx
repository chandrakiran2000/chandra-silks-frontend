import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Loader = () => {
    return(
        <Box sx={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <CircularProgress sx={{ color: "#e2a139" }} />
        </Box>
    )
}

export default Loader