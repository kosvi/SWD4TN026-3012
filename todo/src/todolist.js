import React, { useState } from 'react';

import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Todolist = () => {
    const [todo, setTodo] = useState({description: '', date: ''});
    const [todos, setTodos] = useState([]);

    const columns = [
      { headerName: "Date", field: "date" },
      { headerName: "Description", field: "description" },
    ]
  
    const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});
    }
  
    const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
    }
  
    return (
      <div>
        <form onSubmit={addTodo}>
          <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
          <input type="text" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
  
          <input type="submit" value="Add"/>
        </form>
        <div className="ag-theme-material" style={{height: '700px', widht: '70%', margin: 'auto'}}>
          <AgGridReact
            columnDefs={columns}
            rowData={todos}>
          </AgGridReact>
        </div>
      </div>
    );
  };
  
  export default Todolist;
  