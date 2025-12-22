import "./App.css";
import NewTodo from "./components/NewTodo";
import TodoItem from "./components/TodoItem";
import { useState, useEffect } from "react";


// You can use this to seed your TODO list
const seed = [
    { id: 0, text: "Submit assignment 2", completed: false },
    { id: 1, text: "Reschedule the dentist appointment", completed: false },
    { id: 2, text: "Prepare for CSC309 exam", completed: false },
    { id: 3, text: "Find term project partner", completed: true },
    { id: 4, text: "Learn React Hooks", completed: false },
];

function App() {
    // Complete me
    const [todos, setTodos] = useState(seed);
    const [counter, setCounter] = useState(seed.length);


    const addToDo = (text) => {
        const newTodo = { id: counter, text, completed: false };
        // create new array by copying all elements from current todo array and appending new todo
        setTodos([...todos, newTodo]);
        setCounter(counter + 1);
    };

    const deleteTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    useEffect(() => {
        console.log("Todos updated:", todos);
    }, [todos]);

    return (
        <div className="app">
            <h1>My ToDos</h1>
            <NewTodo onClick={addToDo} />
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <TodoItem 
                            text={todo.text} 
                            // wrapper function to only call deleteTodo when clicked
                            onDelete={() => deleteTodo(todo.id)} 
                        />
                    </li>
                ))} 
            </ul>

        </div>
    );
}

export default App;
