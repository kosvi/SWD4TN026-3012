import './App.css';

import TodoApp from "./todolist.js";

function App() {
  return (
    <div className="App">
      <div className="Header">
        Simple todolist
      </div>
      <div className="Content">
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
