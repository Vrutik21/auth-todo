import React from "react";
import { AppBar, Typography, Toolbar, Button } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/actions/authActions";

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
//   //   authButton: {
//   //     right: theme.spacing(2),
//   //   },
//   title: {
//     flexGrow: 1,
//   },
//   linkStyle: {
//     textDecoration: "none",
//     color: "#fafafa",
//   },
// });

const NavBar = () => {
  const state = useSelector((state) => state);
  const auth = useSelector((state) => state.auth);
  console.log(state);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch(signOut());
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#3bb19b" }}>
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h4">
            <Link style={{ textDecoration: "none", color: "#fafafa" }} to="/">
              Todo App
            </Link>
          </Typography>
          {auth._id ? (
            <>
              <Typography style={{ flexGrow: 1 }} variant="subtitle2">
                Logged in as {auth.name}
              </Typography>
              <Button color="inherit" onClick={() => handleSignout()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  style={{ textDecoration: "none", color: "#fafafa" }}
                  to="/login"
                >
                  Sign In
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  style={{ textDecoration: "none", color: "#fafafa" }}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
