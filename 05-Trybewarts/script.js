const pegarEmail = document.querySelector('#email');
const pegarSenha = document.querySelector('#senha');
const pegarBtnLogin = document.querySelector('#btn-login');

pegarBtnLogin.addEventListener('click', () => {
  if (
    pegarEmail.value === 'tryber@teste.com' && pegarSenha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
  pegarEmail.value = '';
  pegarSenha.value = '';
});

const pegarCheckBox = document.querySelector('#agreement');
const pegarBtnSubmit = document.querySelector('#submit-btn');
pegarBtnSubmit.disabled = true;

pegarCheckBox.addEventListener('click', () => {
  const constCheck = pegarCheckBox.value;

  if (constCheck === null) {
    pegarBtnSubmit.disabled = true;
  } else if (constCheck !== null) {
    pegarBtnSubmit.disabled = false;
  }
});
