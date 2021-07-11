import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FamilyFeud from "./FamilyFeud";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/familyfeud">
            <FamilyFeud />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
