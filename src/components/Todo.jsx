import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isFinished, setIsFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setIsFinished(!isFinished);
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
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
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
    <div className="mx-3 md:container md:mx-auto mt-5 rounded-xl p-5 bg-violet-100 min-h-[64vh] md:w-[35%]">
      <h1 className="font-bold text-center text-3xl">
        Todo App - Manage tasks at one place
      </h1>
      <div className="add-todo my-5 flex flex-col gap-4">
        <h2 className="text-lg font-bold mb-2 text-red-500">Add a Todo</h2>
        <div className="flex">
          <input
            onChange={handleChange}
            type="text"
            className="w-3/4 p-2 rounded-full px-5 py-2"
            value={todo}
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-700 hover:bg-violet-950 p-2 font-bold text-white py-2 text-sm rounded-full mx-6 disabled:bg-violet-400"
          >
            Save
          </button>
        </div>
      </div>

      <input
        className="m-2"
        id="show"
        onChange={toggleFinished}
        type="checkbox"
        checked={isFinished}
      />
      <label className="mx-2" htmlFor="show">
        Show Finished Tasks
      </label>
      <h2 className="text-lg font-bold">My Todo List</h2>

      <div className="todos">
        {todos.length === 0 && (
          <div className="text-red-600 font-bold my-5">
            No Todos to display, kindly add some Todos
          </div>
        )}

        {todos.map((item) => {
          return (
            (isFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between my-3">
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
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
                    <BiEdit />
                  </button>
                  <button
                    className="bg-violet-700 hover:bg-violet-950 p-2 font-bold text-white py-1 text-sm rounded-md mx-2"
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
