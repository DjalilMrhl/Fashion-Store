import { Box, AlertTitle, Alert } from "@mui/material";
import { useEffect, useContext } from "react";
import { CartContext } from "../../Context/context";


const Confirmation = () => {

  const {clearCart} = useContext(CartContext)
  useEffect(() => {
    clearCart()
  }, [])
  

  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;
