import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  state = {
    musicArr: [],
    musicTest: [],
    loading: false,
    favoriteSongs: '',
  };

  async componentDidMount() {
    this.getMusicApi();
  }

  getMusicApi = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const getMusic = await getMusics(id);
    this.setState({
      favoriteSongs,
      musicTest: getMusic,
      loading: false,
      musicArr: getMusic
        .map(
          ({
            previewUrl,
            trackName,
            artworkUrl100,
            collectionName,
            artistName,
            trackId,
          }) => ({
            trackName,
            previewUrl,
            artworkUrl100,
            collectionName,
            artistName,
            trackId,
          }),
        )
        .filter(({ previewUrl }) => previewUrl),
    });
  };

  render() {
    const { musicArr, loading, musicTest, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading && <Loading />}
        {musicArr.length >= 1 && (
          <div className="div-album">
            <img className="album-image" src={ musicArr[0].artworkUrl100 } alt="imagem" />
            <p data-testid="album-name">{`Album: ${musicTest[0].collectionName}`}</p>
            <p data-testid="artist-name">{`Artista: ${musicTest[0].artistName}`}</p>
          </div>
        )}
        {!loading
          && musicArr.length
          && musicArr.map((item, i) => (
            <MusicCard
              key={ i }
              name={ item.trackName }
              url={ item.previewUrl }
              trackId={ item.trackId }
              favoriteSongs={ favoriteSongs.find(
                (element) => element.trackName === item.trackName,
              ) }
            />
          ))}
      </div>
    );
  }
}
