import React from 'react';
// import logo from './cards-img'

export default class Header extends React.Component {
  render() {
    return (
      <header className="header-content">
        <nav>
          <div className="div-header">
            <img src="./cards-img" alt="header cards" target="_blank" />
            <h1>Card Generator</h1>
          </div>
          <a href="https://rafaelrrhocha.github.io/Portfolio/">About Me</a>
        </nav>
      </header>
    );
  }
}

