import './styles.css';
import { ReactComponent as StarImage } from 'assets/images/star.svg';
import { Review } from 'types/review';

type Props = {
  reviews: Review[];
};

const ReviewCard = ({ reviews }: Props) => {



  return (
    <>
      <div className="review-card-container">
        <div className="review-content">
          {reviews.map((rev) => (
            <>
            <div key={rev.id}>
              <div className="client-review-id">
                <StarImage />
                <p >{rev.user.name}</p>
                </div>
             <div className="review-text">
                <p  >{rev.text}</p>
              </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
