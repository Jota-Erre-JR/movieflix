import { Movie } from 'types/movie';
import './styles.css';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Link } from 'react-router-dom';
import MovieCard from 'components/MovieCard';

const MoviesCatalog = () => {
  const [page, setPage] = useState<Movie[]>([]);

  // const arr = [...page];
  // arr.sort((a, b) => a.id - b.id);
  //arr.length = 2;

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        size: 4,
      },
    };

    requestBackend(params)
      .then((response) => {
        setPage(response.data.content);
      })
      .catch((erro) => {
        console.error('error', erro);
      });
  }, []);

  return (
    <>
      <div className="container-fluid overflow-hidden movie-list-container">
        <div className="row">
          {page?.map((movie) => (
            <div
              className="movie-list col-12 col-sm-6 col-md-6 col-xl-3"
              key={movie.id}
            >
              <Link to={'/movies/' + movie.id}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MoviesCatalog;
