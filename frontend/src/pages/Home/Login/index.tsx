import './styles.css';

import MainButton from 'components/MainButton';

const Login = () => {
  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form>
        <div className="mb-4">
          <input
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="mb-2">
          <input
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