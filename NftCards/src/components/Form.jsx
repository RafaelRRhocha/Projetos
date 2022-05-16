import React from 'react';
import Inputs from './FormConfigs/formComponents/Inputs';
import Image from './FormConfigs/formComponents/Image';
import OptionsCheck from './FormConfigs/formComponents/OptionsCheck';
import Button from './FormConfigs/formComponents/Button';

export default class Form extends React.Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form>
        <Inputs
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          onInputChange={ onInputChange }
        />

        <Image cardImage={ cardImage } onInputChange={ onInputChange } />

        <OptionsCheck
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ onInputChange }
          hasTrunfo={ hasTrunfo }
        />

        <Button
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ onSaveButtonClick }
        />
      </form>
    );
  }
}
