import React from "react";
import { createUser } from "../services/userAPI";
import Loading from "./Loading";
import "../Css/Login.css";
import logo from "./music-girl.gif";

export default class Login extends React.Component {
  state = {
    login: "",
    loading: false,
    imagem: "",
  };

  onInputChange = ({ target: { value } }) => this.setState({ login: value });
  onImageChange = ({ target: { value } }) => this.setState({ imagem: value });

  finishLogin = async () => {
    const { login, imagem } = this.state;
    const { history } = this.props;
    this.setState(() => ({ loading: true }));
    await createUser({ name: login, image: imagem });
    history.push("/Projetos/trybeTunes/search/");
  };

  render() {
    const { login, imagem, loading } = this.state;
    const n3 = 3;

    return (
      <div data-testid="page-login" className="page-login">
        {loading ? (
          <Loading />
        ) : (
          <div className="div-login">
            <img src={logo} alt="music girl gif" />
            <form className="login-form">
              <label htmlFor="login">
                <input
                  className="login-name-input"
                  data-testid="login-name-input"
                  type="text"
                  name="login"
                  value={login}
                  onChange={this.onInputChange}
                  placeholder="Digite o seu Login"
                  autoComplete="off"
                />
              </label>
              <label htmlFor="imagem">
                <input
                  type="text"
                  className="login-name-input"
                  name="imagem"
                  value={imagem}
                  onChange={this.onImageChange}
                  placeholder="Selecione a sua Imagem"
                />
              </label>
              <button
                className="btn-login"
                data-testid="login-submit-button"
                type="submit"
                onClick={this.finishLogin}
                disabled={login.length < n3}
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
