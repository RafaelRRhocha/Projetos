import React from 'react';

export default class Button extends React.Component {
  render() {
    const { isSaveButtonDisabled, onSaveButtonClick } = this.props;
    return (
      <div>
        <button
          className="save-btn"
          type="submit"
          data-testid="save-button"
          id="btnSave"
          name="btnSave"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </div>
    );
  }
}
