import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const deleteAllTodos = () => {
    setTodos([]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <div className="w-full min-h-screen select-none flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 to-gray-900 text-white">
        <div className="flex justify-center items-center shadow-lg shadow-gray-950 gap-2 bg-gray-700 p-2 rounded">
          <button onClick={deleteAllTodos} className="btn btn-warning">
            delete all
          </button>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="text"
            name=""
            maxLength={15}
            className="input input-info"
            placeholder="enter todo"
            id=""
          />
          <button onClick={addTodo} className="btn btn-success">
            add
          </button>
        </div>
        <div className="flex flex-col justify-center items-center mt-4 gap-4 max-w-md">
          {todos.map((todo) => (
            <span
              key={todo.id}
              className="bg-gray-700 p-4 rounded-md flex flex-row justify-between items-center w-full gap-4 shadow-md transition-transform transform hover:scale-105"
            >
              <input
                onClick={() => handleToggleTodo(todo.id)}
                type="checkbox"
                checked={todo.completed}
                className="checkbox checkbox-success"
                name=""
                id=""
              />
              <p
                className={`text-lg font-bold transition-all ${
                  todo.completed ? "line-through text-gray-400 font-medium" : ""
                }`}
              >
                {todo.text}
              </p>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-circle btn-error"
              >
                <MdDelete className="w-8 h-8" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
