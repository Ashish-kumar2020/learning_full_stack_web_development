import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => [setLoading(false)]);
  }, []);
  return !loading ? (
    <>
      <Header />
      <main>{/* <Outlet /> */}</main>

      <Footer />
    </>
  ) : (
    <h1>Logout</h1>
  );
}

export default App;