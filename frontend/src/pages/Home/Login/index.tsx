import './styles.css';

import { useForm } from 'react-hook-form';
import MainButton from 'components/MainButton';
import { requestBackendLogin } from 'util/requests';

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        console.log('SUCESSO', response);
      })
      .catch((error) => {
        console.log('Erro', error);
      });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username')}
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="mb-2">
          <input
            {...register('password')}
            type="password"
            className="form-control base-input "
            placeholder="Senha"
            name="password"
          />
        </div>
        <div className="login-submit">
          <MainButton text="FAZER LOGIN" />
        </div>
      </form>
    </div>
  );
};

export default Login;
