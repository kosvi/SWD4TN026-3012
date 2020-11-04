import './App.css';

import Todolist from "./todolist.js";

function App() {
  return (
    <div className="App">
      <div className="Header">
        Simple todolist
      </div>
      <div className="Content">
        <Todolist />
      </div>
    </div>
  );
}

export default App;
