import { Movie } from 'types/movie';
import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Link } from 'react-router-dom';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import { SpringPage } from 'types/vendor/spring';
import CardLoader from './CardLoader';
import MovieFilter, { MovieFilterData } from 'components/MovieFilter';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const MoviesCatalog = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  const [isLoading, setIsLoading] = useState(false);

  const [controlComponentData, setControlComponentData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentData({
      activePage: pageNumber,
      filterData: controlComponentData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentData.activePage,
        size: 4,
        name: controlComponentData.filterData.genre?.name,
        genreId: controlComponentData.filterData.genre?.id,
      },
    };

    setIsLoading(true);
    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [controlComponentData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <>
      <div className="container-fluid overflow-hidden movie-list-container">
        <MovieFilter onSubmitFilter={handleSubmitFilter} />
        <div className="row mx-sm-n5">
          {isLoading ? (
            <CardLoader />
          ) : (
            page?.content.map((movie) => (
              <div
                className="movie-list col-sm-6 col-md-6 col-xl-3"
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
          forcePage={page?.number}
          pageCount={page ? page.totalPages : 0}
          pageRange={5}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};
export default MoviesCatalog;
