import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { name, productImage, price, id, addCartButton, freeShipping } = this.props;

    return (
      <>
        <Link to={ `/details/${id}` } data-testid="product-detail-link">
          <div data-testid="product">
            <img src={ productImage } alt="Product" />
            <p>{name}</p>
            <p>{price}</p>
            {freeShipping && <p data-testid="free-shipping">Frete grátis</p>}
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          id={ id }
          onClick={ addCartButton }
        >
          Add to Cart
        </button>
      </>
    );
  }
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productImage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  addCartButton: PropTypes.func.isRequired,
  freeShipping: PropTypes.bool.isRequired,
};

export default ProductCard;
