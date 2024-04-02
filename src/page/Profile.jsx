import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth";
import { Box, Button, Container, Typography } from "@mui/material";
import { Dashboard } from "../components/Dashboard";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const hadleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Container maxWidth="xl" sx={{ mt: 12 }}>
          <Typography variant="h5">Profile</Typography>
          <Typography variant="h5">Username: {user && user.username}</Typography>
          <Typography variant="h5">Password: {user && user.password}</Typography>
          <Button variant="outlined" color="error" onClick={hadleLogout}>Logout</Button>
        </Container>
      </Box>
    </div>
  );
};

export default Profile;
