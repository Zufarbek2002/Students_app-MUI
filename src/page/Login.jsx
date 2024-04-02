import { useState } from "react";
import { useAuth } from "../components/Auth";
import { Navigate, useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username.length >= 4 && data.password.length >= 4) {
      localStorage.setItem("data", JSON.stringify(data));
      login(data);
      navigate("/");
    } else return alert("Username or password length to short! (more 4)");
  };
  if (!user) {
    return (
      <Box sx={{mt: 10}}>
        <Container>
          <form onSubmit={handleSubmit}>
            <div className="card w-50 m-auto">
              <div className="card-header">
                <h2 className="text-center">Login</h2>
              </div>
              <div className="card-body">
                <div className="box mb-4">
                  <label htmlFor="firstname" className="form-label">
                    Firstname:
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className="form-control"
                    required
                    value={data.username}
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />
                </div>
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  required
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
              <div className="card-footer text-center p-3">
                <button type="submit" className="btn btn-dark w-75 p-2">
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </Container>
      </Box>
    );
  } else return <Navigate to="/profile" />;
};

export default Login;
