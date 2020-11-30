import logo from './logo.svg';
import './App.css';

import React from "react";

import Loading from "./components/Loading.js";
import AddCarForm from "./components/AddCarForm.js";
import { ServerAPI } from "./classes/ServerAPI.js";

async function getCars() {
  try {
    let paluuarvo = await ServerAPI.fetchAllCars();
    console.log(paluuarvo);
  } catch (error) {
    console.log(error);
  }
}

function App() {
  async function getCars() {
    try {
      let paluuarvo = await ServerAPI.fetchAllCars();
      console.log(paluuarvo);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AddCarForm />
      </header>
    </div>
  );
}

export default App;