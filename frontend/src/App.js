import './App.css';
import { Router, Switch, Route } from "react-router-dom";
import history from "./Utils/Routing/history"
import MovieList from './pages/MovieList/MovieList';
import MovieDetails from './pages/MovieDetails/MovieDetails';
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/" component={MovieList} />
      </Switch>
    </Router>
  );
}

export default App;
