import { useEffect, useState } from "react";
import api from "../services/api";
import type Data from "../types/Todotype";

const TodoList = () => {
  const [todos, setTodos] = useState<Data[]>([]);
  const [inp, setInp] = useState("");

  useEffect(() => {
    api.get("/todo").then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!inp.trim()) return;
    const res = await api.post("/todo", { task: inp });
    setTodos([...todos, res.data]);
    setInp("");
  };

  const toggleTodo = async (id: string) => {
    const res = await api.patch(`/todo/${id}`);
    setTodos(todos.map(t => (t._id === id ? res.data : t)));
  };

  const deleteTodo = async (id: string) => {
    await api.delete(`/todo/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">📋 Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          placeholder="Enter todo..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo._id} className="flex justify-between items-center">
            <span
              onClick={() => toggleTodo(todo._id)}
              className={`cursor-pointer ${todo.iscompleted ? "line-through text-gray-500" : ""}`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
