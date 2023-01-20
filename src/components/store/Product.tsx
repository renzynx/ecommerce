import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Box, Button, Chip } from "@mui/material";
import { FC } from "react";
import { Product } from "../../lib/types";

const Product: FC<{ product: Product }> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        image={product.thumbnail}
        sx={{ height: 140 }}
        title={product.title}
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: ".5rem",
            marginBottom: ".5rem",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {product.discountPercentage && (
          <Chip
            label={`${product.discountPercentage}% OFF`}
            color="warning"
            variant="outlined"
          />
        )}
        <Chip variant="outlined" color="info" label={`$${product.price}`} />
        <Button color="primary" variant="contained">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
