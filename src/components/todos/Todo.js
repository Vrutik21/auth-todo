import React from "react";
import { Typography, Button, ButtonGroup } from "@mui/material";
import { Create, Delete, CheckCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import moment from "moment";
import { checkTodo, deleteTodo } from "../../store/actions/todoActions";

const Todo = ({ todo, setTodo }) => {
  const dispatch = useDispatch();

  const handleUpdate = () => {
    setTodo(todo);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleCheck = (id) => {
    dispatch(checkTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <div
        style={{
          margin: "20px auto",
          padding: "20px",
          border: "2px solid #bdbdbd",
          borderRadius: "9px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {todo.isComplete ? (
            <Typography
              variant="subtitle1"
              style={{ textDecoration: "line-through" }}
            >
              {todo.name}
            </Typography>
          ) : (
            <Typography variant="subtitle1">{todo.name}</Typography>
          )}
          <Typography color="#8f8f8f" variant="body2">
            Creator: {todo.author}
          </Typography>
          <Typography color="#8f8f8f" variant="body2">
            Added: {moment(todo.date).format("MMM Do YY")}
          </Typography>
        </div>
        <div>
          <ButtonGroup size="small" aria-label="outlined primary button group">
            <Button onClick={() => handleCheck(todo._id)}>
              {todo.isComplete ? (
                <CheckCircle style={{ color: "green" }} />
              ) : (
                <CheckCircle color="action" />
              )}
            </Button>
            <Button onClick={() => handleUpdate()}>
              <Create color="success" />
            </Button>
            <Button onClick={() => handleDelete(todo._id)}>
              <Delete color="error" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Todo;
