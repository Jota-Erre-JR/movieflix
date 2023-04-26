import { Movie } from 'types/movie';
import './styles.css';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Link } from 'react-router-dom';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import { SpringPage } from 'types/vendor/spring';
import CardLoader from './CardLoader';

const MoviesCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [isLoading, setIsLoading] = useState(false);
  // const arr = [...page];
  // arr.sort((a, b) => a.id - b.id);
  //arr.length = 2;

  const getMovies = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: pageNumber,
        size: 4,
      },
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getMovies(0);
  }, []);

  return (
    <>
      <div className="container-fluid overflow-hidden movie-list-container">
        <div className="row">
          {isLoading ? (
            <CardLoader />
          ) : (
            page?.content.map((movie) => (
              <div
                className="movie-list col-12 col-sm-6 col-md-6 col-xl-3"
                key={movie.id}
              >
                <Link to={'/movies/' + movie.id}>
                  <MovieCard movie={movie} />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="row pagination-container">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          pageRange={3}
          onChange={getMovies}
        />
      </div>
    </>
  );
};
export default MoviesCatalog;
