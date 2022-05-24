import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import '../Css/ProfileEdit.css';

export default class ProfileEdit extends React.Component {
  state = {
    user: {},
    loading: false,
    disabled: false,
  };

  componentDidMount() {
    this.getUserState();
  }

  onInputChange = ({ target: { value, name } }) => {
    this.setState(({ user }) => ({
      user: { ...user, [name]: value },
      disabled: this.disableButton(),
    }));
  };

  disableButton = () => {
    const { user: { name, image, description } } = this.state;
    const n3 = 3;
    if (
      name.length >= n3
      || image.length >= 1
      || description.length >= 1
    ) {
      return true;
    }
    return false;
  };

  getUserState = async () => {
    this.setState({ loading: true });
    const attUser = await getUser();
    this.setState({ user: attUser, loading: false });
  };

  saveProfile = async () => {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await updateUser(user);
    history.push('/profile');
  };

  render() {
    const {
      user: { name, email, image, description },
      loading,
      disabled,
    } = this.state;
    return (
      <>
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div data-testid="page-profile-edit">
            <form className="edit-full-profile">
              <label htmlFor="name">
                Nome:
                <input
                  className="input-profile"
                  type="text"
                  data-testid="edit-input-name"
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }
                  autoComplete="off"
                />
              </label>

              <label htmlFor="image">
                Imagem:
                <input
                  className="input-profile"
                  type="text"
                  data-testid="edit-input-image"
                  name="image"
                  value={ image }
                  onChange={ this.onInputChange }
                  autoComplete="on"
                />
              </label>

              <label htmlFor="email">
                Email:
                <input
                  className="input-profile"
                  type="email"
                  data-testid="edit-input-email"
                  name="email"
                  value={ email }
                  onChange={ this.onInputChange }
                  autoComplete="off"
                />
              </label>

              <label htmlFor="description">
                Descrição:
                <textarea
                  className="textarea-profile"
                  data-testid="edit-input-description"
                  name="description"
                  value={ description }
                  onChange={ this.onInputChange }
                  autoComplete="off"
                />
              </label>

              <button
                className="button-profile"
                type="button"
                data-testid="edit-button-save"
                disabled={ !disabled }
                onClick={ this.saveProfile }
              >
                Editar perfil
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}
