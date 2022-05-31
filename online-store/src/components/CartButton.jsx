import React from 'react';
import PropTypes from 'prop-types';

export default class CartButton extends React.Component {
  render() {
    const { redirectCart } = this.props;
    return (
      <button
        type="button"
        data-testid="shopping-cart-button"
        onClick={ redirectCart }
      >
        Carrinho
      </button>
    );
  }
}

CartButton.propTypes = {
  redirectCart: PropTypes.func.isRequired,
};
