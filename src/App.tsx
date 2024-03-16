import { Stack } from "@mui/system";
import TodoListA from "./A";

const TodoList = () => {
  return (
    <Stack width="100vw" height="100vh" direction="row" spacing={3} justifyContent="center">
        <TodoListA />
        <TodoListA />
    </Stack>
  );
};

export default TodoList;
