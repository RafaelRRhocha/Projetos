import React from 'react';

export default class FilterRare extends React.Component {
  render() {
    const { filterRare, onInputChange } = this.props;

    return (
      <select
        className="filterRare"
        name="filterRare"
        data-testid="rare-filter"
        value={ filterRare }
        onChange={ onInputChange }
      >
        <option>todas</option>
        <option>normal</option>
        <option>raro</option>
        <option>muito raro</option>
      </select>
    );
  }
}
