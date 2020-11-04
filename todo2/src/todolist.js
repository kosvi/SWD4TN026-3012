import React, { useState } from 'react';

import './todolist.css';

export default function Todolist() {

    const [todo, setTodo] = useState({description: '', date: ''});
    const [todos, setTodos] = useState([]);

    const updateTodo = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value});
    }

    const addTodo = () => {
        setTodos([...todos, todo]);
    }

    const delTodo = (index) => {
        setTodos(todos.filter((todo, i) => i !== index));
    }

    const todoRows = todos.map((t, index) => 
        <tr key={index}>
            <td>{t.date}</td>
            <td>{t.description}</td>
            <td><button onClick={() => delTodo(index)}>Delete</button></td>
        </tr>
    );

    return (
        <div>
            <fieldset>
                <legend>Add todo:</legend>
                Description: 
                <input type="text" name="description" value={todo.description} onChange={updateTodo} />
                Date: 
                <input type="text" name="date" value={todo.date} onChange={updateTodo} />
                <button onClick={addTodo}>Add</button>
            </fieldset>
            <p>&nbsp;</p>
            <table>
                <tbody>
                    <tr><th>Date</th><th>Description</th><td style={{border: 'none'}}>&nbsp;</td></tr>
                    {todoRows}
                </tbody>
            </table>
        </div>
    )
}