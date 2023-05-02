import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

import MainButton from 'components/MainButton';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';
import { AxiosRequestConfig } from 'axios';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
      .then((response) => {
        onInsertReview(response.data);
        setValue('text', '');
        toast.info('Avaliação registrada com sucesso!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      })
      .catch((errors) => {
        toast.error('Você precisa inserir uma avaliação!');
        console.error(errors.text.message);
      });
  };

  return (
    <>
      <div className="post-review-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="review-form-content">
            <input
              className="form-outline"
              {...register('text', {
                required: 'Campo obrigatório',
              })}
              type="text"
              name="text"
              placeholder="Deixe sua avaliação aqui."
            />
            <div>{errors.text?.message}</div>

            <MainButton text="SALVAR AVALIAÇÃO" />
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
