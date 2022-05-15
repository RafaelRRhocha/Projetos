import PropTypes from 'prop-types';
import React from 'react';
import TextArea from './TextArea';

export default class Inputs extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      onInputChange,
    } = this.props;
    return (
      <div>
        <h1>Adicionar Nova Carta</h1>
        <div className="text">
          <label htmlFor="nome">
            Nome
            <input
              className="inputs"
              type="text"
              data-testid="name-input"
              id="nome"
              name="cardName"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>
        </div>

        <TextArea
          cardDescription={ cardDescription }
          onInputChange={ onInputChange }
        />

        <div>
          <label htmlFor="attr01">
            Ataque
            <input
              className="inputs"
              type="number"
              data-testid="attr1-input"
              id="attr01"
              name="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
        </div>

        <div>
          <label htmlFor="attr02">
            Defesa
            <input
              className="inputs"
              type="number"
              data-testid="attr2-input"
              id="attr02"
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
        </div>

        <div>
          <label htmlFor="attr03">
            HP
            <input
              className="inputs"
              type="number"
              data-testid="attr3-input"
              id="attr03"
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
        </div>
      </div>
    );
  }
}

Inputs.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
