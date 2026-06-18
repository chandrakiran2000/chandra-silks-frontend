import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f8fafc",
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "80px", md: "120px" },
          fontWeight: 700,
          color: "#e2a139",
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "#1e293b",
          mb: 1,
        }}
      >
        Page Not Found
      </Typography>

      <Typography
        sx={{
          color: "#64748b",
          textAlign: "center",
          mb: 3,
        }}
      >
        The page you are looking for does not exist.
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          bgcolor: "#facc15",
          color: "#000",
          fontWeight: 600,
          "&:hover": {
            bgcolor: "#eab308",
          },
        }}
      >
        Back To Home
      </Button>
    </Box>
  )
}

export default PageNotFound