import { useEffect, useState } from "react";
import api from "../services/api";
import type Data from "../types/Todotype";

const TodoList = () => {
  const [todos, setTodos] = useState<Data[]>([]);
  const [inp, setInp] = useState("");

  useEffect(() => {
    api.get("/todo").then(res => {
      // Handle new API response format
      const responseData = res.data.data || res.data;
      if (responseData.todos) {
        setTodos(responseData.todos);
      } else {
        setTodos(responseData);
      }
    }).catch(err => {
      console.error("Failed to fetch todos:", err);
    });
  }, []);

  const addTodo = async () => {
    if (!inp.trim()) return;
    try {
      const res = await api.post("/todo", { task: inp });
      const newTodo = res.data.data || res.data;
      setTodos([...todos, newTodo]);
      setInp("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const res = await api.patch(`/todo/${id}`);
      const updatedTodo = res.data.data || res.data;
      setTodos(todos.map(t => (t._id === id ? updatedTodo : t)));
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await api.delete(`/todo/${id}`);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Tasks</h2>
          <p className="text-gray-600">Add and manage your daily tasks</p>
        </div>

        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <input
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 pl-12 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-200 outline-none"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">✏️</span>
          </div>
          <button 
            onClick={addTodo} 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Add Task
          </button>
        </div>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-gray-500 text-lg">No tasks yet. Add one above to get started!</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div 
                key={todo._id} 
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() => toggleTodo(todo._id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        todo.iscompleted 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {todo.iscompleted && <span className="text-sm">✓</span>}
                    </button>
                    <span
                      className={`flex-1 text-lg transition-all duration-200 ${
                        todo.iscompleted 
                          ? "line-through text-gray-400" 
                          : "text-gray-800 hover:text-gray-600"
                      }`}
                    >
                      {todo.task}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-500">
              {todos.filter(t => t.iscompleted).length} of {todos.length} tasks completed
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(todos.filter(t => t.iscompleted).length / todos.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
