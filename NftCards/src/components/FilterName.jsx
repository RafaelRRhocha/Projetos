import PropTypes from 'prop-types';
import React from 'react';

export default class FilterName extends React.Component {
  render() {
    const { filterName, onInputChange } = this.props;
    return (
      <input
        className="name-filter"
        type="text"
        data-testid="name-filter"
        name="filterName"
        placeholder="digite o nome da carta"
        value={ filterName }
        onChange={ onInputChange }
      />
    );
  }
}

FilterName.propTypes = {
  filterName: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};
