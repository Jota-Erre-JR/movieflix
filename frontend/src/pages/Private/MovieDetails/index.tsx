import './styles.css';

import ReviewCard from 'components/ReviewCard';
import { hasAnyRoles } from 'util/auth';
import { useParams } from 'react-router-dom';
import { Review } from 'types/review';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import ReviewForm from 'components/ReviewForm';

type urlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<urlParams>();

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

const handleInsertReview = (review: Review) =>{
  const clone = [...reviews];
  clone.push(review);
  setReviews(clone);
}

  return (
    <>
      <div className="moviedetails-card">
        <h1>Tela detalhes do filme id: {movieId}</h1>
        {hasAnyRoles(['ROLE_MEMBER']) && (
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview }/>
        )}
        <ReviewCard reviews={reviews} />
      </div>
    </>
  );
};

export default MovieDetails;
