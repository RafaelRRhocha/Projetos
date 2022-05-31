import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { getDetails } from '../services/api';
import Comments from './Comments';

class Details extends React.Component {
  state = {
    detalhes: [],
    cart: [],
  };

  componentDidMount() {
    this.detalhes();
    if (localStorage.getItem('CartItem')) {
      this.setState({ cart: JSON.parse(localStorage.getItem('CartItem')) });
    }
  }

  detalhes = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const detalhe = await getDetails(id);
    this.setState({
      detalhes: detalhe,
    });
  };

  addCartButton = async () => {
    const { detalhes, cart } = this.state;

    if (cart.length === 0) {
      detalhes.qntt = 1;
      this.setState({ cart: [detalhes] });
      return localStorage.setItem('CartItem', JSON.stringify([detalhes]));
    }
    if (cart.some((element) => element.id === detalhes.id)) {
      const index = cart.findIndex((element) => element.id === detalhes.id);
      cart[index].qntt += 1;
      this.setState({ cart: [...cart] });
      return localStorage.setItem('CartItem', JSON.stringify(cart));
    }
  };

  render() {
    const { detalhes } = this.state;

    const cart = JSON.parse(localStorage.getItem('CartItem'));
    let total = 0;
    if (cart) {
      total = cart.reduce((acc, item) => acc + item.qntt, 0);
    }
    return (
      <div>
        <p data-testid="product-detail-name">{detalhes.title}</p>
        <p>{detalhes.price}</p>
        <img src={ detalhes.thumbnail } alt="Imagem do produto" />
        <div>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addCartButton }
          >
            Add to Cart
          </button>
          <Link to="/cart">
            <button data-testid="shopping-cart-button" type="button">
              Carrinho
            </button>
          </Link>
          <span data-testid="shopping-cart-size">{ total }</span>
        </div>
        <Comments id={ detalhes.id } />
      </div>
    );
  }
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Details;
