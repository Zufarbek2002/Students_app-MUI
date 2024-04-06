import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/Auth";
import { Box, Button, Container, Typography } from "@mui/material";
import { Dashboard } from "../components/Dashboard";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const hadleLogout = () => {
    if (confirm("Are you sure!")) {
      logout();
      navigate("/login");
    }
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Dashboard />
        <Container maxWidth="sm" sx={{ mt: 15 }}>
          <Typography variant="h4">Profile</Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography variant="h5">
              Username: {user && user.name}
            </Typography>
            <Typography variant="h5">
              Password: {user && user.password}
            </Typography>
            <Button
              sx={{ width: "25%" }}
              variant="outlined"
              color="error"
              onClick={hadleLogout}
            >
              Logout
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Profile;
