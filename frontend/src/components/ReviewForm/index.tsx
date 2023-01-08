import { AxiosRequestConfig } from 'axios';
import './styles.css';

import MainButton from 'components/MainButton';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
}

type FormData = {
movieId: number;
text: string;
}

const ReviewForm = ({movieId, onInsertReview}: Props) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);
    console.log(formData);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
    .then(response =>{
    setValue('text', '');
    onInsertReview(response.data);
    console.log("SUCESSO AO SALVAR", response);
  })
  .catch(erro => {
    console.log("ERRO AO SALVAR", errors);
  });
  }
  return (
    <>
      <div className="post-review-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="review-form-content">
          <input className="form-outline"
         {...register('text',{
          required: 'Campo obrigatório'
          })}
          type="text"
          name="text"
          placeholder="Deixe sua avaliação aqui" 
          />
          <div>
            {errors.text?.message}
          </div>
        
        <MainButton text="SALVAR AVALIAÇÃO" />
        </div>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;