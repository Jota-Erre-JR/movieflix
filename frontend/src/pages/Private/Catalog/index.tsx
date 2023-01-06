import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

const MoviesCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <>
    <div>
      <p>Tela listagem de filmes</p>
    </div>
    <div className="movie-list">
    {page?.content.map((movie) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
            <Link to={"/movies/" + movie.id}>
              <p>{"Acessar /movies/" + movie.title}</p>
            </Link>
          </div>
        ))}
    </div>
    </>
  );
};
export default MoviesCatalog;
