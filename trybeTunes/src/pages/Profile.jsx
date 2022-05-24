import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../Css/Profile.css';

export default class Profile extends React.Component {
  state = {
    loading: false,
    user: {},
  };

  componentDidMount() {
    this.getUserState();
  }

  getUserState = async () => {
    this.setState({ loading: true });
    const updateUser = await getUser();
    this.setState({ user: updateUser, loading: false });
  };

  render() {
    const { user: { name, email, image, description }, loading } = this.state;
    return (
      <>
        <Header />
        {loading ? <Loading /> : (
          <div data-testid="page-profile" className="profile">
            <div className="profile-edit">
              <img src={ image } alt="imagem de perfil" data-testid="profile-image" />
              <Link className="link-profile" to="/Projetos/trybeTunes/profile/edit/">Editar perfil</Link>
            </div>
            <div className="infos-profile">
              <p>Nome:</p>
              <span>{name}</span>

              <p>Email:</p>
              <span>{email}</span>

              <p>Descrição:</p>
              <span>{ description }</span>
            </div>
          </div>
        )}
      </>
    );
  }
}
