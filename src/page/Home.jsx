import { Container, Typography } from "@mui/material";
import { Dashboard } from "../components/Dashboard";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Container maxWidth="xl" sx={{ mt: 12 }}>
          <Typography variant="h5">Home</Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
