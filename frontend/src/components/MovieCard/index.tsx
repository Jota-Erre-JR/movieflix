import './styles.css';

import { Movie } from 'types/movie';

type Props = {
  movie: Movie
}
const MovieCard = ({movie} : Props) => {
  return (
       <div className="movie-card">
      <div className="movie-card-top">
        <img src={movie.imgUrl} alt={movie.title} />
      </div>
      <div className="movie-card-bottom">
        <h6>{movie.title} </h6>
        <h5>{movie.year}</h5>
        <p>{movie.subTitle}</p>
      </div>
    </div>
  );
};

export default MovieCard;