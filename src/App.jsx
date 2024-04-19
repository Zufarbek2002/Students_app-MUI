// import { Dashboard } from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Teachers from "./page/Teachers";
import Students from "./page/Students";
import Login from "./page/Login";
import Profile from "./page/Profile";
import { AuthProvider } from "./components/Auth";
import RequireAuth from "./components/RequireAuth";
import { Provider } from "react-redux";
import store from "./app/store";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/teachers"
              element={
                <RequireAuth>
                  <Teachers />
                </RequireAuth>
              }
            />
            <Route
              path="/students"
              element={
                <RequireAuth>
                  <Students />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </Provider>
  );
};

export default App;
