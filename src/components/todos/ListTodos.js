import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import Todo from "./Todo";
import { getTodo } from "../../store/actions/todoActions";

const ListTodos = ({ setTodo }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  // console.log(todos);

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          margin: "20px auto",
          padding: "20px",
          borderRadius: "9px",
          boxShadow: "0px 0px 12px -3px #000000",
        }}
      >
        <Typography style={{ textAlign: "center" }} variant="h5">
          {todos.length > 0 ? "Todos" : "No Todos Yet"}
        </Typography>
        {todos.map((todo) => {
          return <Todo setTodo={setTodo} todo={todo} key={todo._id} />;
        })}
      </div>
    </>
  );
};

export default ListTodos;
