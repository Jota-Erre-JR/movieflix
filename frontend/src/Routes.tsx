import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import MovieDetails from 'pages/Private/MovieDetails';
import { Route, Router, Switch } from 'react-router-dom';
import MoviesCatalog from 'pages/Private/Catalog';
import PrivateRoute from 'components/PrivateRoute';
import history from 'util/history';

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <PrivateRoute path="/movies">
        <Route path="/movies" exact>
          <MoviesCatalog />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
