import MainButton from 'components/MainButton';
import './styles.css';

const ReviewForm = () => {
  return (
    <>
      <div className="post-review-container">
        <div className="form-outline">
          <input type="form" placeholder="Deixe sua avaliação aqui" aria-label="Deixe sua avaliação aqui" className="review-form"/>
        </div>
        <MainButton text="SALVAR AVALIAÇÃO" />
      </div>
    </>
  );
};

export default ReviewForm;