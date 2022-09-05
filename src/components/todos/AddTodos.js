import React from "react";
import { TextField, Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { teal } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/actions/todoActions";
import { editTodo } from "../../store/actions/todoActions";

const theme = createTheme({
  palette: {
    secondary: {
      main: teal[400],
    },
  },
});

const AddTodos = ({ todo, setTodo }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // checking if we are adding the todo or updating it

    if (todo._id) {
      const id = todo._id;
      const updatedTodo = {
        name: todo.name,
        isComplete: todo.isComplete,
        date: todo.date,
        author: todo.author,
        uid: todo.uid,
      };

      dispatch(editTodo(updatedTodo, id));
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };
      // dispatch an action creator
      dispatch(addTodo(newTodo));
    }

    setTodo({
      name: "",
      isComplete: false,
    });
  };

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        style={{
          margin: "0px auto",
          padding: "30px",
          borderRadius: "9px",
          boxShadow: "0px 0px 12px -3px #000000",
          display: "flex",
          justifyContent: "space-between",
        }}
        onSubmit={handleSubmit}
      >
        <ThemeProvider theme={theme}>
          <TextField
            id="add"
            variant="outlined"
            label="Enter Todo"
            autoFocus
            fullWidth
            color="secondary"
            value={todo.name}
            onChange={(e) => {
              setTodo({ ...todo, name: e.target.value });
            }}
          />
          <Button
            style={{ marginLeft: "20px" }}
            variant="contained"
            type="submit"
            color="secondary"
          >
            <Send />
          </Button>
        </ThemeProvider>
      </form>
    </>
  );
};

export default AddTodos;
