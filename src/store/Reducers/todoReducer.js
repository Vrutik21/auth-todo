import { toast } from "react-toastify";

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case "GET":
      return action.todos.data;

    case "ADD":
      // console.log(action);
      // console.log(action.payload.data);
      toast.success("A todo was added.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return [action.todo.data, ...state];

    case "EDIT":
      toast.success("A todo was updated.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });

    case "CHECK":
      toast.success("A todo status was changed.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state.map((todo) =>
        todo._id === action.todo.data._id ? action.todo.data : todo
      );

    case "DELETE":
      toast.error("A todo was deleted.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return state.filter((todo) => todo._id !== action.id);
    default:
      return state;
  }
};
