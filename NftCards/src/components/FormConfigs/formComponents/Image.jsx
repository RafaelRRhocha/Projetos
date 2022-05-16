import React from 'react';

export default class Image extends React.Component {
  render() {
    const { cardImage, onInputChange } = this.props;
    return (
      <div>
        <label htmlFor="image">
          Imagem
          <input
            className="inputs"
            type="text"
            data-testid="image-input"
            id="image"
            name="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
      </div>
    );
  }
}
