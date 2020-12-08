import './App.css';

// 3rd party components
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// These imports are for menu 
import { TitleBar, Drawer } from "./components/Drawer.js";
import { drawerConfig } from "./config/drawerConfig.js";

// Here we import all pages
import Home from "./pages/Home.js";
import CustomerList from "./pages/Customers.js";
import TrainingList from "./pages/Trainings.js";
import About from "./pages/About.js";
import { Error404 } from "./pages/Errors.js";

function App() {

  // By default, menu is closed
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  // Here we can define the list of links in the menu
  const menuContent = [
    { path: "/", name: "Home" },
    { path: "/customers", name: "Customers" },
    { path: "/trainings", name: "Trainings" },
    { path: "/about", name: "About" },
  ];

  return (
    <div className="App">
      <TitleBar title="Personal trainer" toggleMethod={toggleDrawer} menuText="Menu" menuOpen={drawerOpen} />
      {/*<DrawerButton toggleMethod={toggleDrawer} open={drawerOpen} text="Menu" />*/}
      <Router>
        <Drawer open={drawerOpen} menu={menuContent} />
        <div style={{ marginTop: "60px" }}>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/customers"><CustomerList /></Route>
            <Route path="/trainings"><TrainingList customerTrainingUrl="https://customerrest.herokuapp.com/api/customers/1/trainings" /></Route>
            <Route path="/about"><About /></Route>
            <Route><Error404 /></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
