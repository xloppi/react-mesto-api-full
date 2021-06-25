import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register ({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(registerData);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input name="email" type="email" className="auth__input" placeholder="Email" value={registerData.email} onChange={handleChange} ></input>
        <input name="password" type="password" className="auth__input" placeholder="Пароль" value={registerData.password} onChange={handleChange}></input>
        <button className="auth__submit-button">Зарегистрироваться</button>
      </form>
      <div className="auth__navigation">
        <p className="auth__navigation-title">Уже зарегистрированы?</p>
        <Link className="auth__navigation-link" to="/login">
          Войти
        </Link>
      </div>
    </div>
  )
}

export default Register;
