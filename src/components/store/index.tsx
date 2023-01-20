import useSWR from "swr";
import { fetcher } from "../../lib/utils";
import { ProductReturn } from "../../lib/types";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Product from "./Product";

const Store = () => {
  const { data, isLoading } = useSWR<ProductReturn, void>(
    " https://dummyjson.com/products",
    fetcher
  );

  if (!data || isLoading) {
    return <Typography>Loading...</Typography>;
  }

  console.log(data);

  return (
    <Box
      sx={{
        padding: "3rem",
        display: "grid",
        placeItems: "center",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {data.products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </Box>
  );
};

export default Store;
