import './styles.css';

import { Movie } from 'types/movie';

type Props = {
  movie: Movie
}
const MoviesCard = ({movie} : Props) => {
  return (
    <div className="base-card product-card">
      <div className="card-top-container">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="card-bottom-container">
        <h6>{movie.title}</h6>
      </div>
    </div>
  );
}

export default MoviesCard;