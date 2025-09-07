import type Data from "../types/Todotype"
import { Tododata } from "../services/Tododata"
import { useState } from "react"

export const Todomain = () => {
  const [todos, setTodos] = useState<Data[]>(Tododata);
  const [inp, setInp] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [edittext, setEdittext] = useState<string>("");

  // ✅ toggle todo
  const toggletodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // ✅ delete todo
  const todoDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // ✅ add todo
  const addValue = () => {
    if (!inp.trim()) return;
    const temp = {
      id: Date.now(),
      title: inp,
      completed: false
    }
    setTodos([...todos, temp])
    setInp('')
  }

  // ✅ save edited todo
  const saveText = () => {
    if (!edittext.trim()) return
    setTodos(todos.map((todo) =>
      todo.id === editingId ? { ...todo, title: edittext } : todo
    ))
    setEditingId(null)
    setEdittext('')
  }

  // ✅ cancel editing
  const cancelEdit = () => {
    setEditingId(null)
    setEdittext('')
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">📋 Todo List</h1>

      {/* input + button */}
      <div className="flex gap-2 mb-4">
        <input
          placeholder="Enter the task"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          onClick={addValue}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* todos list */}
      <ul className="space-y-3">
        {todos && todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {editingId === todo.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  placeholder="Start editing..."
                  value={edittext}
                  onChange={(e) => setEdittext(e.target.value)}
                  className="flex-1 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  onClick={saveText}
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
                >
                  Save
                </button>

                <button
                  onClick={cancelEdit}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span
                  onClick={() => toggletodo(todo.id)}
                  className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                >
                  {todo.title}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditingId(todo.id); setEdittext(todo.title); }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => todoDelete(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
