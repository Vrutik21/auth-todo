import "./App.css";
import { useEffect } from "react";
import Signup from "./components/signup/signup";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import NavBar from "./components/navBar/NavBar";
import { Container } from "@mui/material";
import Todos from "./components/todos/Todos";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Container maxWidth="lg">
        <NavBar />
        <Container style={{ margin: "30px auto" }} maxWidth="md">
          <Routes>
            {/* {user && <Route path="/" exact element={<Todo />} />} */}

            <Route path="/" exact element={<Todos />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            {/* <Route path="/" exact element={<Navigate replace to="/login" />} />s */}
          </Routes>
        </Container>
      </Container>
    </>
  );
}

export default App;
