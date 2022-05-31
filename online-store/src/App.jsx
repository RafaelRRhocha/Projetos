import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Produtos from './components/Produtos';
import Cart from './components/Cart';
import Details from './components/Details';
import Checkout from './components/Checkout';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Produtos } />
          <Route exact path="/cart" component={ Cart } />
          <Route path="/details/:id" component={ Details } />
          <Route path="/checkout" component={ Checkout } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
