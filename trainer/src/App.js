import './App.css';

// 3rd party components
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";

// These imports are for menu 
import { TitleBar, Drawer } from "./components/Drawer.js";
import { drawerConfig } from "./config/drawerConfig.js";

// Here we import all pages
import Home from "./pages/Home.js";
import CustomerList from "./pages/CustomerList.js";
import TrainingList from "./pages/Trainings.js";
import Customer from "./pages/Customer.js";
import About from "./pages/About.js";
import { Error404 } from "./pages/Errors.js";

/*
// https://medium.com/better-programming/using-url-parameters-and-query-strings-with-react-router-fffdcea7a8e9
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
*/

function App() {

  // By default, menu is closed
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  const closeDrawer = () => {
    setDrawerOpen(false);
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
      <TitleBar title="Personal trainer" toggleMethod={toggleDrawer} closeMethod={closeDrawer} menuText="Menu" menuOpen={drawerOpen} />
      {/*<DrawerButton toggleMethod={toggleDrawer} open={drawerOpen} text="Menu" />*/}
      <Router>
        <Drawer open={drawerOpen} menu={menuContent} />
        <div style={{ marginTop: "60px" }}>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route path="/customers"><CustomerList /></Route>
            <Route path="/customer/:id"><Customer /></Route >
            <Route path="/trainings"><TrainingList customer="-1" /></Route>
            <Route path="/about"><About /></Route>
            <Route><Error404 /></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
