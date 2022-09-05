import axios from "axios";
import { url } from "../../api";
import { toast } from "react-toastify";

const setHeaders = () => {
  const headers = {
    headers: {
      auth: localStorage.getItem("token"),
    },
  };

  return headers;
};

// action creator to get todos
export const getTodo = () => {
  return (dispatch) => {
    axios
      .get(`${url}/todos`, setHeaders())
      .then((todos) => {
        dispatch({
          type: "GET",
          todos,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

// action creator to add  a todo
export const addTodo = (todo) => {
  return (dispatch, getState) => {
    const author = getState().auth.name;
    const uid = getState().auth._id;
    axios
      .post(`${url}/todos`, { ...todo, author, uid }, setHeaders())
      .then((todo) => {
        dispatch({
          type: "ADD",
          todo,
        });
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

// action creator to edit  a todo
export const editTodo = (updatedTodo, id) => {
  return (dispatch) => {
    axios
      .put(`${url}/todos/${id}`, updatedTodo, setHeaders())
      .then((todo) => {
        dispatch({
          type: "EDIT",
          todo,
        });
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

// action creator to check a todo
export const checkTodo = (id) => {
  return (dispatch) => {
    axios
      .patch(`${url}/todos/${id}`, {}, setHeaders())
      .then((todo) => {
        dispatch({
          type: "CHECK",
          todo,
        });
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};

// action creator to delete a todo
export const deleteTodo = (id) => {
  return (dispatch) => {
    axios
      .delete(`${url}/todos/${id}`, setHeaders())
      .then(() => {
        dispatch({
          type: "DELETE",
          id,
        });
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response?.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
};
