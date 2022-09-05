import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../store/actions/authActions";
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

const Login = () => {
  // const history = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [pass, setPass] = useState({ showPassword: false });

  const [error, setError] = useState("");

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
      dispatch(signIn(data));
      setData({
        email: "",
        password: "",
      });
      // const url = "http://localhost:5000/api/auth";
      // const { data: res } = await axios.post(url, data);
      // localStorage.setItem("token", res.data);
      // history.push("/");
      // // window.location = "/";
      // console.log(res.message);
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.data.message);
      }
    }
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
          Login
        </Typography>
        <ThemeProvider theme={theme}>
          <TextField
            style={{ marginTop: "20px" }}
            type="email"
            label="Enter email"
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
            <InputLabel>Enter password</InputLabel>
            <OutlinedInput
              type={pass.showPassword ? "text" : "password"}
              label="Enter password"
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
              Login
            </Button>
          </Box>
        </ThemeProvider>
      </form>
    </>
  );
};

export default Login;
