import { Box, AlertTitle, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/Slices/cartSlice";
import { useEffect } from "react";


const Confirmation = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])
  

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
