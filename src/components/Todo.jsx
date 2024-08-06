import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (e, id) => {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;
    const newData = { id: uuidv4(), todo, isCompleted: false };
    setTodos([...todos, newData]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setTodos(newTodos);
  };

  return (
    <div className="container mx-auto mt-5 rounded-xl p-5 bg-violet-100 min-h-[64vh]">
      <div className="add-todo my-5">
        <h2 className="text-lg font-bold mb-2 text-red-500">Add a Todo</h2>
        <input
          type="text"
          className="w-3/4 p-2"
          onChange={handleChange}
          value={todo}
        />
        <button
          className="bg-violet-700 hover:bg-violet-950 p-2 font-bold text-white py-1 text-sm rounded-md mx-6"
          onClick={handleAdd}
        >
          Save
        </button>
      </div>
      <h2 className="text-lg font-bold">My Todo List</h2>
      {todos.length === 0 && (
        <div className="text-red-600 font-bold my-5">
          No Todos to display, kindly add some Todos
        </div>
      )}
      <div className="todos">
        {todos.map((item) => (
          <div key={item.id} className="todo flex justify-between my-3">
            <div className="flex gap-5">
              <input
                name={item.id}
                type="checkbox"
                checked={item.isCompleted}
                onChange={handleCheckBox}
              />
              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}
              </div>
            </div>
            <div className="buttons flex h-full">
              <button
                className="bg-violet-700 hover:bg-violet-950 p-2 font-bold text-white py-1 text-sm rounded-md mx-2"
                onClick={(e) => handleEdit(e, item.id)}
              >
                Edit
              </button>
              <button
                className="bg-violet-700 hover:bg-violet-950 p-2 font-bold text-white py-1 text-sm rounded-md mx-2"
                onClick={(e) => handleDelete(e, item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
