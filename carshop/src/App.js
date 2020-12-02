import logo from './logo.svg';
import './App.css';

import React, { useState } from "react";

import Loading from "./components/Loading.js";
import AddCarForm from "./components/AddCarForm.js";
import ListCars from "./components/ListCars.js";

function App() {

  const [addFormIsOpen, setAddFormIsOpen] = React.useState(true);

  const closeAddForm = () => {
    setAddFormIsOpen(false);
  }

  React.useEffect(() => {
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div style={{minWidth: "1250px", width: "80%", marginLeft: "auto", marginRight: "auto"}}>
        <ListCars height="800px" width="100%" />
        </div>
      {addFormIsOpen && <AddCarForm closeMethod={closeAddForm} />}
      <Loading message="foo" />
    </div>
  );
}

export default App;