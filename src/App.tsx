import { useRef, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};
type Todos = Todo[];
type SetTodos = (todos: Todo[]) => void;
type SetTodo = (todo: string) => void;

type RegisterProps = {
  todo: string;
  todos: Todos;
  setTodos: SetTodos;
  setTodo: SetTodo;
};

type DoneTodoProps = {
  todos: Todos;
  setTodos: SetTodos;
};

type TodoListProps = {
  todos: Todos;
  setTodos: SetTodos;
};

let nextID = 0;

const Input = (props: any) => {
  return (
    <input
      ref={props.inputRef}
      value={props.todo}
      onChange={(e) => props.setTodo(e.target.value)}
    />
  );
};

const register = (props: RegisterProps) => {
  if (!props.todo) {
    return;
  }
  const newTodos = [
    { id: nextID++, text: props.todo, done: false },
    ...props.todos,
  ];
  props.setTodos(newTodos);
  props.setTodo("");
};

const Register = (props: any) => {
  return (
    <input
      style={{ margin: "3px" }}
      id="input"
      type="button"
      value="register"
      onClick={props.onClick}
    />
  );
};

const doneTodo = (props: DoneTodoProps, todo: Todo) => {
  const newTodos = props.todos.map((el) => {
    if (el.id === todo.id) {
      el.done = !el.done;
      return el;
    }
    return el;
  });
  props.setTodos(newTodos);
};

const TodoList = (props: TodoListProps) => {
  return (
    <ul id="todolist">
      {props.todos.length > 0 &&
        props.todos.map((todo: Todo) => (
          <li
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
            key={todo.id}
            onClick={() => doneTodo(props, todo)}
          >
            📝 {todo.text}
          </li>
        ))}
    </ul>
  );
};

function App() {
  const [todos, setTodos] = useState([] as Todo[]);
  const [todo, setTodo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ padding: "10px" }}>
      <h1>Todo</h1>
      <Input inputRef={inputRef} todo={todo} setTodo={setTodo} />
      <Register
        onClick={() => {
          register({
            todos,
            todo,
            setTodo,
            setTodos,
          });
          inputRef.current?.focus();
        }}
      />
      <hr />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
