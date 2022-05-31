import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

class Categorias extends React.Component {
  state = {
    categorias: [],
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categorias = await getCategories();
    this.setState({
      categorias,
    });
  };

  render() {
    const { categorias } = this.state;
    const { handleButton } = this.props;

    return (
      <div>
        {categorias.map((categoria) => (
          <button
            type="button"
            key={ categoria.id }
            data-testid="category"
            name={ categoria.name }
            onClick={ handleButton }
          >
            {categoria.name}
          </button>
        ))}
      </div>
    );
  }
}

Categorias.propTypes = {
  handleButton: PropTypes.func.isRequired,
};

export default Categorias;
