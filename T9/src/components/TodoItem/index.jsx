import "./style.css";
import trashIcon from './trash.webp';
import { useState } from "react";


function TodoItem( {text, onDelete} ) {
    // Complete me

    const [completed, setCompleted] = useState(false);

    const toggleCompleted = () => {
        setCompleted(!completed);
    }

    return (
        <div className={`todo-item row`}>
            <input type="checkbox" checked={completed} onChange={toggleCompleted} />
            <span className={`${completed ? "completed" : ""}`}>{text}</span>
            <a
                href="#"
                onClick={onDelete}>
                <img src={trashIcon} alt="Delete" className="trash-icon" />
            </a>
        </div>
    )
}

export default TodoItem;