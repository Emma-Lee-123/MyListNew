import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import "./App.css";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useUser } from "./UserContext";
import ListMain from "./components/LiatMain";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="" element={<ListMain />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const PrivateRoute = () => {
  const { user } = useUser();

  if (!user || user.id === 0) {
    return <Navigate to={"/signin"} />;
  }
  return <Outlet />;
};

export default App;
