import React, { useState, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Todolist = () => {
  const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const columns = [
    { headerName: "Description", field: "description", sortable: true, filter: true, floatingFilter: true },
    { headerName: "Date", field: "date", sortable: true, filter: true, floatingFilter: true },
    { headerName: "Priority", field: "priority", sortable: true, filter: true, floatingFilter: true, cellStyle: params => params.value === 'High' ? { color: '#f00' } : { color: '#000' } },
  ]

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const addTodo = () => {
    // event.preventDefault();
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) => index !== gridRef.current.getSelectedNodes()[0].childIndex));
    }
    else {
      alert('Select row first!');
    }
  }

  return (
    <div>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description} />
      <input type="text" onChange={inputChanged} placeholder="Date" name="date" value={todo.date} />
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority} />

      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div className="ag-theme-material" style={{ height: '700px', width: '70%', margin: 'auto' }}>
        <AgGridReact animateRows='true' ref={gridRef} onGridReady={params => gridRef.current = params.api} rowSelection="single" columnDefs={columns} rowData={todos}>
        </AgGridReact>
      </div>
    </div>
  );
};

export default Todolist;