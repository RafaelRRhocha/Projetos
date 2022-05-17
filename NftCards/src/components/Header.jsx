import React from 'react';
// import logo from '../../cards-img'

export default class Header extends React.Component {
  render() {
    return (
      <header className="header-content">
        <nav>
          <div className="div-header">
            <img src="../../cards-img" alt="header cards" />
            <p>Card Generator</p>
          </div>
          <a href="https://rafaelrrhocha.github.io/Portfolio/">About Me</a>
        </nav>
      </header>
    );
  }
}

