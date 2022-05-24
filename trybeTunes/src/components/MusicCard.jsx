import React from 'react';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import '../Css/MusicCard.css';

export default class MusicCard extends React.Component {
  state = {
    check: false,
    loading: false,
  };

  componentDidMount() {
    const { favoriteSongs } = this.props;
    this.setState({ check: favoriteSongs });
  }

  handleCheck = async ({ target: { checked } }) => {
    const { trackId } = this.props;

    this.setState({ check: checked, loading: true });
    if (checked) { await addSong(await getMusics(trackId)); }
    if (!checked) { await removeSong(await getMusics(trackId)); }

    this.setState({ loading: false });
  };

  render() {
    const { name, url, trackId } = this.props;
    const { check, loading } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <section className="sec-album">
        <div className="audio-components">
          <p>{name}</p>
          <audio
            data-testid="audio-component"
            src={ url }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor="check">
            <input
              className="checkbox"
              type="checkbox"
              name="check"
              data-testid={ `checkbox-music-${trackId}` }
              checked={ check }
              onChange={ this.handleCheck }
            />
            Favorita
          </label>
        </div>
      </section>
    );
  }
}
