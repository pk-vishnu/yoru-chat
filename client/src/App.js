import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Users from "./components/users/Users";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="/users" element={<Users />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
