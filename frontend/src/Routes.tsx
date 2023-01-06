import Navbar from 'components/Navbar';
import Catalog from 'pages/Private/Catalog';
import Home from 'pages/Home';
import MovieDetails from 'pages/Private/MovieDetails';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies" exact>
          <Catalog />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
