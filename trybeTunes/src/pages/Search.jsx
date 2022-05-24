import React from 'react';
import { Link } from 'react-router-dom';
import { CaretCircleDoubleRight } from 'phosphor-react';
import Header from '../components/Header';
import SearchAlbumsAPIs from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../Css/Search.css';

export default class Search extends React.Component {
  state = {
    music: '',
    musicResult: '',
    loading: true,
    albuns: [],
  };

  onInputChange = ({ target: { value } }) => this.setState({ music: value });

  searchMusic = async () => {
    this.setState({ loading: true });

    const { music } = this.state;
    const getAlbuns = await SearchAlbumsAPIs(music);
    this.setState({
      loading: false,
      albuns: getAlbuns,
      music: '',
      musicResult: music,
    });
    this.setState({ loading: true });
  };

  render() {
    const { music, musicResult, loading, albuns } = this.state;
    const n2 = 2;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {!loading ? (
            <Loading />
          ) : (
            <div className="search">
              <label htmlFor="search">
                <input
                  className="search-artist-input"
                  type="text"
                  data-testid="search-artist-input"
                  name="search"
                  value={ music }
                  onChange={ this.onInputChange }
                  placeholder="digite o nome do artista"
                  autoComplete="off"
                />
              </label>
              <button
                className="search-button"
                type="button"
                data-testid="search-artist-button"
                disabled={ music.length < n2 }
                onClick={ this.searchMusic }
              >
                Pesquisar
              </button>
            </div>
          )}
          {albuns.length >= 1 ? (
            <div>
              <p className="resultAlbuns">
                {`Resultado de álbuns de: ${musicResult}`}
              </p>
              <div>
                {albuns.map((item, i) => (
                  <Link
                    key={ i }
                    to={ `/album/${item.collectionId}` }
                    data-testid={ `link-to-album-${item.collectionId}` }
                    className="div-link-preview-albuns"
                  >
                    <div className="preview-albuns">
                      <img
                        className="img-preview"
                        src={ item.artworkUrl100 }
                        alt={ item.artistName }
                      />
                      <div className="div-link-preview">
                        <p className="link-preview">{ `${item.collectionName}  | ` }</p>
                        <p className="link-preview">{item.artistName}</p>
                        <CaretCircleDoubleRight className="animate-icons" size={ 65 } />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p className="anotherAlbum">Nenhum álbum foi encontrado</p>
          )}
        </div>
      </>
    );
  }
}
