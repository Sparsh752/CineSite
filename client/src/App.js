import Home from './Home';
import Login from './Login';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Adding from './Adding';
import Admin from './Admin';
function App() {
  
  return (
    <div className="App">
      <Router>
        <div className="content">
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/add">
              <Adding />
            </Route>
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
 