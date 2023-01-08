import { Movie } from 'types/movie';
import './styles.css';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Link } from 'react-router-dom';

const MoviesCatalog = () => {
  const [page, setPage] = useState<Movie[]>([]);

  const arr = [...page];
  arr.sort((a, b) => a.id - b.id);
  arr.length = 2;

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
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
      <div className="movie-list-container">
        <h1>Tela listagem de filmes</h1>

        <div>
          {arr?.map((movie) => (
            <div className="movie-list" key={movie.id}>
              <Link to={'/movies/' + movie.id}>
                <p> Acessar /movies/{movie.id}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MoviesCatalog;
