import logo from '../images/logo.svg';
import {Route, Switch, Link} from "react-router-dom";

function Header({ onLogout, userEmail }) {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип страницы Место" />
        <nav className="header__navigation">
          <div className="header__navigation-container">
            <Switch>
              <Route path="/sign-up">
                <Link className="header__link" to='/sign-in'>
                  Войти
                </Link>
              </Route>
              <Route path="/sign-in">
                <Link className="header__link" to='/sign-up'>
                  Регистрация
                </Link>
              </Route>
              <Route path="/">
                  <p>{userEmail}</p>
                  <button className="header__button-logout" onClick={onLogout}>Выйти</button>
              </Route>
            </Switch>
          </div>
        </nav>
      </header>
    );
}

export default Header;
