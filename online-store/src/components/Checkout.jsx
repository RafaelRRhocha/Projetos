import React from 'react';

export default class Checkout extends React.Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="checkout-fullname">
            Nome Completo
            <input name="checkout-fullname" data-testid="checkout-fullname" />
          </label>
          <label htmlFor="checkout-email">
            Email
            <input name="checkout-email" type="email" data-testid="checkout-email" />
          </label>
          <label htmlFor="checkout-cpf">
            CPF
            <input name="checkout-cpf" data-testid="checkout-cpf" />
          </label>
          <label htmlFor="checkout-phone">
            Telefone
            <input name="checkout-phone" data-testid="checkout-phone" />
          </label>
          <label htmlFor="checkout-cep">
            CEP
            <input name="checkout-cep" data-testid="checkout-cep" />
          </label>
          <label htmlFor="checkout-address">
            Endereço
            <input name="checkout-address" data-testid="checkout-address" />
          </label>
        </form>
      </div>
    );
  }
}
