import './styles.css';

import ReviewForm from 'components/ReviewForm';
import ReviewCard from 'components/ReviewCard';

const MovieDetails = () => {
 
  return (
    <>
      <div className="moviedetails-card">
        <h1>Tela detalhes do filme id: 1</h1>
      </div>
      <div>
        <ReviewForm />
      </div>
      <div>
        <ReviewCard />
      </div>
    </>
  );
};

export default MovieDetails;
