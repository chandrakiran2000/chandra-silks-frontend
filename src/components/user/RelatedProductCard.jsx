import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";



const RelatedProductCard = ({ product }) => {
    const navigate = useNavigate();

  return (
    <Card
      sx={{
        borderRadius: 3,
        width : {xs: 220, sm: 240, md: 260,},
        flexShrink: 0,
        p: 2,
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <CardMedia
        component="img"
        image={product.image_url}
        alt={product.name}
        sx={{
          height: 250,
          width : "100%",
          objectFit: "cover",
          borderRadius: "12px"
        }}
      />

      <CardContent>
        <Typography
          sx={{
            fontWeight: 600,
            mb: 1,
            minHeight: "50px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            color: "#111827",
            fontWeight: 700,
            fontSize: "18px",
          }}
        >
          ₹ {product.price}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#facc15",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          View Product
        </Button>
      </CardContent>
    </Card>
  );
};

export default RelatedProductCard;