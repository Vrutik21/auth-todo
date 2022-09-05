import { Navigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    secondary: {
      main: teal[400],
    },
  },
});

const Signup = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  // console.log(state);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [pass, setPass] = useState({
    showPassword: false,
  });

  const [error, setError] = useState();

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPass({
      showPassword: !pass.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUp(data));
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.data.message);
      }
    }
    // try {
    //   const url = "http://localhost:5000/api/users";
    //   const { data: res } = await axios.post(url, data);
    //   navigate("/login");
    //   console.log(res.message);
    // } catch (err) {
    //   if (
    //     err.response &&
    //     err.response.status >= 400 &&
    //     err.response.status <= 500
    //   ) {
    //     setError(err.response.data.message);
    //   }
    // }
  };

  if (auth._id) return <Navigate to="/" />;

  return (
    <>
      <form
        noValidate
        style={{
          margin: "0px auto",
          padding: "30px",
          borderRadius: "9px",
          boxShadow: "0px 0px 12px -3px #000000",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Signup
        </Typography>
        <ThemeProvider theme={theme}>
          <TextField
            style={{ marginTop: "20px" }}
            type="text"
            label="First Name"
            variant="outlined"
            color="secondary"
            fullWidth
            value={data.firstName}
            name="firstName"
            onChange={handleChange("firstName")}
          />
          <TextField
            style={{ marginTop: "20px" }}
            type="text"
            label="Last Name"
            variant="outlined"
            color="secondary"
            fullWidth
            value={data.lastName}
            name="lastName"
            onChange={handleChange("lastName")}
          />
          <TextField
            style={{ marginTop: "20px" }}
            type="email"
            label="Email"
            variant="outlined"
            color="secondary"
            fullWidth
            value={data.email}
            name="email"
            onChange={handleChange("email")}
          />
          <FormControl
            fullWidth
            variant="outlined"
            color="secondary"
            style={{ marginTop: "20px" }}
          >
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={pass.showPassword ? "text" : "password"}
              label="Password"
              value={data.password}
              name="pass"
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {pass.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {error && <div className="error-msg-sign">{error}</div>}
          <Box style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: "20px" }}
              type="submit"
            >
              SignUp
            </Button>
          </Box>
        </ThemeProvider>
      </form>
    </>
  );
};

export default Signup;
