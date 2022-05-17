import React from "react";

export default class Card extends React.Component {
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
      preview,
      deleteButtonClick,
    } = this.props;

    return (
      <>
        {preview && (
          <section className="card-preview">
            <h1 className="h1-card-preview">Pré-visualização</h1>
            <div className="border-preview">
              <img
                className="image-preview"
                src={cardImage}
                data-testid="image-card"
              />
              <div className="hover-preview">
                <h2 className="name-card-preview" data-testid="name-card">
                  {cardName}
                </h2>
                <p
                  className="description-card-preview"
                  data-testid="description-card"
                >
                  {cardDescription}
                </p>
                <div className="card-attr-preview">
                  <p className="attr-preview" data-testid="attr1-card">
                    {cardAttr1}
                  </p>
                  <p className="attr-preview" data-testid="attr2-card">
                    {cardAttr2}
                  </p>
                  <p className="attr-preview" data-testid="attr3-card">
                    {cardAttr3}
                  </p>
                </div>
                <p className="rare-card-preview" data-testid="rare-card">
                  Raridade: {cardRare}
                </p>
                {cardTrunfo && (
                  <p className="trunfo-card-preview" data-testid="trunfo-card">
                    Super Trunfo
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {!preview && (
          <section className="card">
            <h1 className="h1-card">Pré-visualização</h1>
            <div className="border">
              <img
                className="image"
                src={cardImage}
                alt={cardName}
                data-testid="image-card"
              />
              <div className="hover">
                <h2 className="name-card" data-testid="name-card">
                    {cardName}
                  </h2>
                <p className="description-card" data-testid="description-card">
                  {cardDescription}
                </p>
                <div className="card-attr">
                  <p data-testid="attr1-card">{cardAttr1}</p>
                  <p data-testid="attr2-card">{cardAttr2}</p>
                  <p data-testid="attr3-card">{cardAttr3}</p>
                </div>
                <p className="rare-card" data-testid="rare-card">
                  Raridade: {cardRare}
                </p>
                {cardTrunfo && (
                  <p className="trunfo-card" data-testid="trunfo-card">
                    Super Trunfo
                  </p>
                )}
                {!preview && (
                  <button
                    className="save-btn"
                    name={cardName}
                    data-testid="delete-button"
                    onClick={deleteButtonClick}
                    type="button"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
}
