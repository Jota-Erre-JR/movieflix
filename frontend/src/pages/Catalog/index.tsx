import MovieCard from 'components/MovieCard';

import './styles.css';
import { Movie } from 'types/movie';

const Catalog = () => {
  const movie: Movie = {
    id: 1,
    title: 'Bob Esponja',
    subTitle: 'O Incrível Resgate',
    year: 2020,
    imgUrl:
      'https://image.tmdb.org/t/p/w533_and_h300_bestv2/wu1uilmhM4TdluKi2ytfz8gidHf.jpg',
    synopsis:
      'Onde está Gary? Segundo Bob Esponja, Gary foi "caracolstrado" pelo temível Rei Poseidon e levado para a cidade perdida de Atlantic City. Junto a Patrick Estrela, ele sai em uma missão de resgate ao querido amigo, e nesta jornada os dois vão conhecer novos personagens e viver inimagináveis aventuras.',
    genre: [
      {
        id: 1,
        name: 'Comédia',
      },
    ],
    reviews: [
      {
        id: 1,
        text: 'Meh, filme OK',
        movieId: 1,
        user: [
          {
            id: 1,
            name: 'Bob',
            email: 'bob@gmail.com',
            roles: [
              {
                id: 1,
                authority: 'ROLE_VISITOR',
              },
            ],
          },
        ],
      },
      {
        id: 2,
        text: 'Gostei e recomendo!',
        movieId: 1,
        user: [
          {
            id: 1,
            name: 'Bob',
            email: 'bob@gmail.com',
            roles: [
              {
                id: 1,
                authority: 'ROLE_VISITOR',
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <>
      <div className="catalog-main-card">
        <h1>Tela listagem de filmes</h1>
      </div>
      <div className="catalog-list">
        <div>
          <MovieCard movie={movie} />
        </div>
        <div>
          <MovieCard movie={movie} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
