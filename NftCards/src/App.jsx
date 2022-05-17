import React from "react";
import Form from "./components/Form";
import Card from "./components/Card";
import FilterName from "./components/FilterName";
import FilterRare from "./components/FilterRare";
import "./App.css";
import "./Preview.css";
import "./Cards.css";
import Header from "./components/Header";

class App extends React.Component {
  state = {
    cardName: "",
    cardDescription: "",
    cardAttr1: "",
    cardAttr2: "",
    cardAttr3: "",
    cardImage: "",
    cardRare: "normal",
    filterName: "",
    filterRare: "todas",
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: false,
    cardsDeck: [],
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });

    this.setState(
      ({
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
      }) => {
        const valorTotal = 210;
        const valorMax = 90;
        const valorMin = 0;

        const attr01 = Number(cardAttr1);
        const attr02 = Number(cardAttr2);
        const attr03 = Number(cardAttr3);

        if (
          cardName.length >= 1 &&
          cardDescription.length >= 1 &&
          cardImage.length >= 1 &&
          cardRare.length >= 1 &&
          attr01 <= valorMax &&
          attr02 <= valorMax &&
          attr03 <= valorMax &&
          attr01 >= valorMin &&
          attr02 >= valorMin &&
          attr03 >= valorMin &&
          attr01 + attr02 + attr03 <= valorTotal
        ) {
          return { isSaveButtonDisabled: true };
        }
        return { isSaveButtonDisabled: false };
      }
    );
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { cardTrunfo: trunfoTrue } = this.state;

    this.setState(
      ({
        cardName,
        cardDescription,
        cardImage,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardRare,
        cardsDeck,
      }) => ({
        cardName: "",
        cardDescription: "",
        cardImage: "",
        cardAttr1: "0",
        cardAttr2: "0",
        cardAttr3: "0",
        cardRare: "normal",
        cardsDeck: [
          ...cardsDeck,
          {
            cardName,
            cardDescription,
            cardImage,
            cardAttr1,
            cardAttr2,
            cardAttr3,
            cardRare,
          },
        ],
      })
    );

    if (trunfoTrue) {
      this.setState({ hasTrunfo: true });
    }
  };

  deleteButtonClick = (event) => {
    const { name } = event.target;
    this.setState(({ cardsDeck }) => ({
      cardsDeck: cardsDeck.filter((cards) => cards.cardName !== name),
    }));

    this.setState(({ cardsDeck }) => {
      if (cardsDeck.every((card) => card.cardTrunfo === false)) {
        return { hasTrunfo: false };
      }
    });
  };

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
      cardsDeck,
      filterName,
      filterRare,
    } = this.state;

    let cardsFinal = cardsDeck;

    if (filterName.length > 0) {
      cardsFinal = cardsFinal.filter((card) =>
        card.cardName.includes(filterName)
      );
    }

    if (filterRare !== "todas") {
      cardsFinal = cardsFinal.filter((card) => card.cardRare === filterRare);
    }

    return (
      <>
        <Header />
        <section className="main-content">
          <Form
            cardName={cardName}
            cardDescription={cardDescription}
            cardAttr1={cardAttr1}
            cardAttr2={cardAttr2}
            cardAttr3={cardAttr3}
            cardImage={cardImage}
            cardRare={cardRare}
            cardTrunfo={cardTrunfo}
            hasTrunfo={hasTrunfo}
            isSaveButtonDisabled={!isSaveButtonDisabled}
            onInputChange={this.onInputChange}
            onSaveButtonClick={this.onSaveButtonClick}
          />

          <Card
            cardName={cardName}
            cardDescription={cardDescription}
            cardAttr1={cardAttr1}
            cardAttr2={cardAttr2}
            cardAttr3={cardAttr3}
            cardImage={cardImage}
            cardRare={cardRare}
            cardTrunfo={cardTrunfo}
            preview={this.state}
            deleteButtonClick={this.deleteButtonClick}
          />

          <div className="filtros">
            <h2>Filtros de Busca</h2>
            <FilterName
              filterName={filterName}
              onInputChange={this.onInputChange}
            />

            <FilterRare
              filterRare={filterRare}
              onInputChange={this.onInputChange}
            />
          </div>

          {cardsFinal.map((item, index) => (
            <Card
              key={index}
              cardName={item.cardName}
              cardDescription={item.cardDescription}
              cardAttr1={item.cardAttr1}
              cardAttr2={item.cardAttr2}
              cardAttr3={item.cardAttr3}
              cardImage={item.cardImage}
              cardRare={item.cardRare}
              cardTrunfo={item.cardTrunfo}
              deleteButtonClick={this.deleteButtonClick}
            />
          ))}
        </section>
      </>
    );
  }
}

export default App;
