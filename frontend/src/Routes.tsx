import Navbar from 'components/Navbar';
import Catalog from 'pages/Catalog';
import Home from 'pages/Home';
import MovieDetails from 'pages/MovieDetails';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies">
          <Catalog />
        </Route>
        <Route path="/movies:movieId">
          <MovieDetails />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;