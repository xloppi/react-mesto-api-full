import { useState } from 'react';

function Login ({ onLogin }) {
  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setloginData({
      ...loginData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input name="email" className="auth__input" placeholder="Email" value={loginData.email} onChange={handleChange}></input>
        <input name="password" className="auth__input" placeholder="Пароль" value={loginData.password} onChange={handleChange}></input>
        <button className="auth__submit-button">Войти</button>
      </form>
    </div>
  )
}

export default Login;
