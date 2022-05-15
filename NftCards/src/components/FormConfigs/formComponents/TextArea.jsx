import PropTypes from 'prop-types';
import React from 'react';

export default class TextArea extends React.Component {
  render() {
    const { cardDescription, onInputChange } = this.props;
    return (
      <div>
        <label htmlFor="textarea">
          Descrição
          <textarea
            data-testid="description-input"
            id="textarea"
            name="cardDescription"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
      </div>
    );
  }
}

TextArea.propTypes = {
  cardDescription: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
