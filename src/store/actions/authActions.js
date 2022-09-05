import { url } from "../../api/index";
import { toast } from "react-toastify";
import axios from "axios";

export const signUp = (user) => {
  return (dispatch) => {
    axios
      .post(`${url}/users`, user)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: "SIGNUP",
          //   can be an error
          token: token.data,
        });
      })
      .catch((err) => {
        console.log(err.response);

        toast.error(err.response?.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const signIn = (creds) => {
  return (dispatch) => {
    axios
      .post(`${url}/auth`, creds)
      .then((token) => {
        localStorage.setItem("token", token.data);
        dispatch({
          type: "SIGNIN",
          //   can be an error
          token: token.data,
        });
      })
      .catch((err) => {
        console.log(err.response);

        toast.error(err.response?.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: "USERLOADED",
        token,
      });
    } else {
      return null;
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "SIGNOUT",
    });
  };
};
