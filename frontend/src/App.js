import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route element={<HomePage />} path="/"></Route>
          <Route element={<PrivateRoutes />}>
            <Route element={<ProfilePage />} path="/profile"></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
