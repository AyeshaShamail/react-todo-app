import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    console.log("working ", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(JSON.parse(localStorage.getItem("todos")));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    const newData = { id: uuidv4(), todo, isCompleted: false };
    setTodos([...todos, newData]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
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
        {todos.map((item) => {
          return (
            <div key={item.id} className="todo flex justify-between my-3">
              <div className="flex gap-5">
                <input
                  name={item.id}
                  type="checkbox"
                  value={item.isCompleted}
                  onChange={handleCheckBox}
                  id=""
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
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
