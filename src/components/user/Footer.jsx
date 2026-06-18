import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";


const Footer = () => {
    const whatsappNumber = "917675072422";
  const navigate = useNavigate ()

  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        bgcolor: "#fff",
        borderTop: "1px solid #e2e8f0",
        py: 4,
        px: 2,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography
          variant="h6"
          sx={{
            color: "#e2a139",
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Chandra Silks
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#64748b", textAlign: "center" }}
        >
          Premium Silk Sarees for Every Occasion
        </Typography>

        <Stack
          direction="row"
          spacing={3}
          sx={{ color: "#475569", fontWeight: 500 }}
        >
          <Typography sx={{cursor: "pointer", color: "#2563eb", "&:hover": { color: "#1d4ed8", textDecoration: "underline", }, }} onClick={() => navigate("/")} >Products</Typography>
          <Typography sx={{cursor: "pointer", color: "#2563eb", "&:hover": { color: "#1d4ed8", textDecoration: "underline", }, }} onClick={() => navigate("/cart")}>Cart</Typography>
          <Typography sx={{cursor: "pointer", color: "#2563eb", "&:hover": { color: "#1d4ed8", textDecoration: "underline", }, }} onClick={() => navigate("/orders")}>Orders</Typography>
        </Stack>

        <Typography variant="body2" color="#64748b">
          📧 chandrakiran3a@gmail.com
        </Typography>

        <Typography variant="body2" color="#64748b">
          📞 +91 76750 72422
        </Typography>

        <IconButton
          component="a"
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          sx={{
            bgcolor: "#25D366",
            color: "#fff",
            "&:hover": {
              bgcolor: "#1ebe5d",
            },
          }}
        >
          <WhatsAppIcon />
        </IconButton>

        <Typography variant="caption" color="#94a3b8">
          © {new Date().getFullYear()} Chandra Silks. All Rights Reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;