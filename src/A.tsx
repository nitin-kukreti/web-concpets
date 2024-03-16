import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db, { Todo } from "./db";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { Switch } from "@mui/material";

const TodoListA: React.FC = () => {
  const [newTodoText, setNewTodoText] = useState("");
  const [completed,setCompleted] = useState<boolean>(false);
  const todos: Todo[] = useLiveQuery(() => db.todos.filter((td)=>td.completed === completed).toArray(), [completed]) || [];

  const toggleTodo = async (id: number) => {
    const todo = todos.find((todo: Todo) => todo.id === id);
    if (todo) {
      await db.todos.put( {...todo,completed: !todo.completed  });
    }
  };

  const deleteTodo = async (id: number) => {
    await db.todos.delete(id);
  };

  const addTodo = async () => {
    if (newTodoText.trim() === "") return;
    const todo = { text: newTodoText, completed: false };
    await db.todos.add(todo);
    setNewTodoText("");
  };

  if (!todos) return <div>Loading...</div>;

  return (
    <Stack>
      <h1>Todos A</h1>
      <Switch onChange={(_e,checked)=>{setCompleted(checked);}} />
      <List>
        {todos.map((todo: Todo) => (
          <ListItem key={todo.id}>
            <Checkbox
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id!)}
            />
            <ListItemText primary={todo.text} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTodo(todo.id!)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Stack direction="row" spacing={1}>
        <TextField
          label="Add Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <Button variant="contained" onClick={addTodo}>
          Add
        </Button>
      </Stack>
    </Stack>
  );
};

export default TodoListA;
