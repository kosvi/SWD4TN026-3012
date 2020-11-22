import React, { useState, useRef } from 'react';

import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const Todolist = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const dateInputChanged = (newDate) => {
    setSelectedDate(newDate);
    let dateString = "" + newDate.getDate() + "." + newDate.getMonth() + "." + newDate.getFullYear();
    setTodo({ ...todo, date: dateString });
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
      <TextField name="description" label="Description" onChange={inputChanged} value={todo.description} />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker label="Date" value={selectedDate} onChange={(value) => dateInputChanged(value)} />
      </MuiPickersUtilsProvider>
      <TextField name="priority" label="Priority" onChange={inputChanged} value={todo.priority} />

      <Button onClick={addTodo} variant="contained">Add</Button>
      <Button onClick={deleteTodo} variant="contained">Delete</Button>
      <div className="ag-theme-material" style={{ height: '700px', width: '70%', margin: 'auto' }}>
        <AgGridReact animateRows='true' ref={gridRef} onGridReady={params => gridRef.current = params.api} rowSelection="single" columnDefs={columns} rowData={todos}>
        </AgGridReact>
      </div>
    </div>
  );
};

export default Todolist;