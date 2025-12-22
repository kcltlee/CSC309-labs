import { useState } from "react";
import "./style.css";

function NewTodo({ onClick }) {
    // Complete me
    const [value, setValue] = useState("");

    // need to constantly update value as user types so that react rerenders DOM
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleClick = () => {
         const text = value.trim(); // remove extra spaces
        if (!text) return; // prevent empty todos
        onClick(text); // send value back to parent
        setValue(""); // clear input after adding
    };

    return (
        <div className="new-todo row">
            <input 
                type="text" 
                placeholder="Enter a new task" 
                value={value}
                onChange={handleChange}
            />
            <button onClick={handleClick}>+</button>
        </div>

    );

}

export default NewTodo;
