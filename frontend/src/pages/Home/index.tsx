import { ReactComponent as MainImage } from 'assets/images/main_image.svg';

import './styles.css';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-card">
          <div className="home-content-container">
            <div>
              <h1>Avalie Filmes</h1>
              <p>Diga o que você achou do seu filme favorito</p>
            </div>
            <div className="home-image-container">
              <MainImage />
            </div>
          </div>
          
        </div>
        <div className="login-card-container">
            <h1>Login Card</h1>
          </div>
      </div>
    </>
  );
};

export default Home;
