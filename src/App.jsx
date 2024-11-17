import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import "./styles.css";
import { TodoList } from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    const newTodo = { id: crypto.randomUUID(), title, completed: false };
    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    const element = document.querySelector(`li[data-id="${id}"]`);
    if (element) {
      element.classList.add("removing");
      setTimeout(() => {
        setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
      }, 300);
    }
  }

  function clearCompleted() {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <div>
        <button onClick={() => setFilter("all")}
          className={`btn ${filter === "all" ? "active" : ""}`}
          aria-pressed={filter === "all"}>
            All
        </button>
        <button onClick={() => setFilter("active")}
          className={`btn ${filter === "active" ? "active" : ""}`}
          aria-pressed={filter === "active"}>
            Active
        </button>
        <button onClick={() => setFilter("completed")}
          className={`btn ${filter === "completed" ? "active" : ""}`}
          aria-pressed={filter === "completed"}>
            Completed
        </button>
      </div>
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <div className="clear-completed-container">
        <button onClick={clearCompleted} className="btn btn-danger">
          Clear Completed
        </button>
      </div>
    </>
  );
}
