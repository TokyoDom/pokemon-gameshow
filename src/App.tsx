import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FamilyFeud from "./FamilyFeud";
import Home from "./Home";
import Directory from "./Directory";
import { FamilyFeudQuestions } from "./dummyData.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route 
            path="/familyfeud/:id" 
            render={
              props => 
              <FamilyFeud 
                key={props.match.params.id} 
                idx={parseInt(props.match.params.id)} 
                prompt={FamilyFeudQuestions[parseInt(props.match.params.id) - 1]}
                length={FamilyFeudQuestions.length}
              />
            } 
          />
          <Route path="/familyfeud">
            <Directory questions={FamilyFeudQuestions.map(prompt => prompt.question)}/>
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
