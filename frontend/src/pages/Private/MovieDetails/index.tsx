import './styles.css';

import ReviewCard from 'components/ReviewCard';
import { hasAnyRoles } from 'util/auth';
import { useParams } from 'react-router-dom';
import { Review } from 'types/review';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import ReviewForm from 'components/ReviewForm';
import { Movie } from 'types/movie';

type urlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<urlParams>();

  const [movie, setMovie] = useState<Movie>();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true,
    };
    requestBackend(config).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  return (
    <>
      <div className="movie-details-container">
        <div className="movie-card-details">
          <div className="movie-card-top-details">
            <img src={movie?.imgUrl} alt={movie?.title} />
          </div>
          <div className="movie-card-bottom-details">
            <h6>{movie?.title} </h6>
            <span>{movie?.year}</span>
            <p>{movie?.subTitle}</p>
            <div className="movie-card-bottom-details-synopsis">
              <h3>{movie?.synopsis}</h3>
            </div>
          </div>
        </div>
        <div>
          {hasAnyRoles(['ROLE_MEMBER']) && (
            <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
          )}
          <ReviewCard reviews={reviews} />
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
