import './styles.css';
import { ReactComponent as StarImage } from 'assets/images/star.svg';

const ReviewCard = () => {
  return (
    <>
      <div className="review-card-container">
        <div className="review-content">
          <div className="client-review-id">
            <StarImage />
            <p>Maria Silva</p>
          </div>
          <div className="review-text">
            <p>Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</p>
          </div>
          <div className="client-review-id">
            <StarImage />
            <p>Maria Silva</p>
          </div>
          <div className="review-text">
            <p>Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</p>
          </div><div className="client-review-id">
            <StarImage />
            <p>Maria Silva</p>
          </div>
          <div className="review-text">
            <p>Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</p>
          </div><div className="client-review-id">
            <StarImage />
            <p>Maria Silva</p>
          </div>
          <div className="review-text">
            <p>Gostei muito do filme. Foi muito bom mesmo. Pena que durou pouco.</p>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default ReviewCard;
