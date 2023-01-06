import './styles.css';

import { Movie } from 'types/movie';

type Props = {
  movie: Movie
}
const MovieCard = ({movie} : Props) => {
  return (
       <div className="base-card movie-card">
      <div className="card-top-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
    </div>
  );
};

export default MovieCard;