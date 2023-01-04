import './styles.css';

const ReviewForm = () => {
  return (
    <>
      <div className="post-review-container">
        <div className="form-outline">
          <input type="form" placeholder="Deixe sua avaliação aqui" aria-label="Deixe sua avaliação aqui" className="review-form"/>
        </div>
        <div className="post-review-button">
        <button type="button" className="btn btn-post-review">
          <p>SALVAR AVALIAÇÃO</p>
        </button>
        </div>
      </div>
    </>
  );
};

export default ReviewForm;