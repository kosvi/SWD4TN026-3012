import './App.css';

// 3rd party components
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// These imports are for menu 
import { TitleBar, DrawerButton, Drawer } from "./components/Drawer.js";
import { drawerConfig } from "./config/drawerConfig.js";

// Here we import all pages
import Home from "./pages/Home.js";
import About from "./pages/About.js";

function App() {

  // By default, menu is closed
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  // Here we can define the list of links in the menu
  const menuContent = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About" },
  ];

  return (
    <div className="App">
      <TitleBar title="Personal trainer" />
      <DrawerButton toggleMethod={toggleDrawer} open={drawerOpen} text="Menu" />
      <Router>
        <Drawer open={drawerOpen} menu={menuContent} />
        <div style={{ marginTop: "10px" }}>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/about"><About /></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
