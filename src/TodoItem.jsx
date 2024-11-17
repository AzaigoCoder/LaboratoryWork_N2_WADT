export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li data-id={id}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
          aria-label={`Mark ${title} as ${completed ? "incomplete" : "complete"}`}/>
        {title}
      </label>
      <button
        onClick={() => deleteTodo(id)}
        className="btn btn-danger"
        aria-label={`Delete ${title}`}>
          Delete
      </button>
    </li>
  );
}
  