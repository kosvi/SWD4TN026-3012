import logo from './logo.svg';
import './App.css';
import Todolist from './todolist.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Todolist</p>
      </header>
      <fieldset className="TodoFields">
        <legend>Add todo:</legend>
        <Todolist />
      </fieldset>
    </div>
  );
}

export default App;
