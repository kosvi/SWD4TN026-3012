import './App.css';

import React from "react";

import AddCarForm from "./components/AddCarForm.js";
import ListCars from "./components/ListCars.js";
import EditCarForm from "./components/EditCarForm.js";

function App() {

  const [addFormIsOpen, setAddFormIsOpen] = React.useState(false);
  const [carInEditing, setCarInEditing] = React.useState(null);

  const toggleAddForm = () => {
    setAddFormIsOpen(!addFormIsOpen);
    setCarInEditing(null);
  }

  const openEditForm = (car) => {
    console.log(car);
    setCarInEditing(car);
    setAddFormIsOpen(false);
  }

  const closeEditForm = () => {
    setCarInEditing(null);
  }

  React.useEffect(() => {
  }, []);

  return (
    <div className="App">
      <div style={{ minWidth: "1250px", width: "1%", height: "100vh", marginLeft: "auto", marginRight: "auto" }}>
        <ListCars height="95%" width="100%" pageSize="10" addMethod={toggleAddForm} editMethod={openEditForm} />
      </div>
      <div style={{ position: "absolute", top: "0", left: "0" }}>
        {addFormIsOpen && <AddCarForm closeMethod={toggleAddForm} />}
        {carInEditing != null && <EditCarForm car={carInEditing} closeMethod={closeEditForm} />}
      </div>
    </div>
  );
}

export default App;