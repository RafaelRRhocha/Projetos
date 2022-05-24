import React from 'react';
import { Link } from 'react-router-dom';
import { LightbulbFilament } from 'phosphor-react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import '../Css/Header.css';

export default class Header extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    this.getUserState();
  }

  getUserState = async () => {
    const updateUser = await getUser();
    this.setState({ user: updateUser });
  };

  toogleColor = () => document.documentElement.classList.toggle('dark-mode');

  render() {
    const {
      user: { name, image },
    } = this.state;
    return (
      <header data-testid="header-component" className="header">
        {!name ? (
          <Loading />
        ) : (
          <Link className="profile-div" to="/profile">
            <img
              src={ image }
              alt="imagem de perfil"
              className="profile-img"
            />
            <p data-testid="header-user-name" className="header-user-name">
              {name}
            </p>
          </Link>
        )}

        <nav className="navigation">
          <button type="button" className="dark-mode" onClick={ this.toogleColor }>
            <LightbulbFilament size={ 32 } />
          </button>
          <Link
            className="link-header"
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisar
          </Link>
          <Link
            className="link-header"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritos
          </Link>
          <Link
            className="link-header"
            data-testid="link-to-profile"
            to="/profile"
          >
            Ver Perfil
          </Link>
        </nav>
      </header>
    );
  }
}
