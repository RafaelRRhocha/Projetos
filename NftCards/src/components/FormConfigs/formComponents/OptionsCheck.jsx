import React from 'react';

export default class OptionsCheck extends React.Component {
  render() {
    const { cardRare, cardTrunfo, hasTrunfo, onInputChange } = this.props;
    return (
      <>
        <div>
          <label htmlFor="select">
            Raridade
            <select
              data-testid="rare-input"
              id="select"
              name="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
        </div>

        {!hasTrunfo ? (
          <div className="checkbox">
            <label htmlFor="checkbox">
              <input
                type="checkbox"
                data-testid="trunfo-input"
                id="checkbox"
                name="cardTrunfo"
                checked={ cardTrunfo }
                value={ cardTrunfo }
                onChange={ onInputChange }
              />
              Special Card
            </label>
          </div>
        ) : (
          <p>Você já tem um Super Trunfo em seu baralho</p>
        )}
      </>
    );
  }
}
