// Requisito 3
function login() {
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
}
login();

// Requisito 18
function habilitandoBtn() {
  const pegarCheckBox = document.querySelector('#agreement');
  const pegarBtnSubmit = document.querySelector('#submit-btn');
  const pegarSeletor = document.querySelector('.checkFinish');
  pegarBtnSubmit.disabled = true;

  pegarCheckBox.addEventListener('click', (event) => {
    const constCheck = pegarCheckBox.value;

    pegarCheckBox.classList.remove('checkFinish');

    if (constCheck === pegarSeletor) {
      pegarBtnSubmit.disabled = true;
    } else if (constCheck !== pegarSeletor) {
      pegarBtnSubmit.disabled = false;
    }
  });
}
habilitandoBtn();

// Requisito 20
function caracteres() {
  // Referencia this.value: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/this
  const valor = this.value;
  const quant = 500;
  const total = valor.length;

  if (total <= quant) {
    const resto = quant - total;
    document.querySelector('#counter').innerHTML = resto;
  } else {
    // Refencia substr(): https://www.w3schools.com/jsref/jsref_substr.asp
    document.querySelector('#textarea').value = valor.substr(0, quant);
  }
}
document.querySelector('#textarea').addEventListener('keyup', caracteres);

// Requisito 21
function pegarValores() {
  const subjectCheckBox = document.querySelectorAll('.subject');
  const checkedContent = [];
  for (let i = 0; i < subjectCheckBox.length; i += 1) {
    if (subjectCheckBox[i].checked === true) {
      checkedContent.push(subjectCheckBox[i].value);
    }
  }

  const sobreNome = document.querySelector('#input-lastname');
  const criarP = document.createElement('p');
  criarP.innerText = `Suas Informações:
  Nome: ${document.querySelector('#input-name').value} ${sobreNome.value}
  Email: ${document.querySelector('#input-email').value}
  Casa: ${document.querySelector('#house').value}
  Família: ${document.querySelector('.selectedFamily').value}
  Matérias: ${checkedContent.join(', ')}
  Avaliação: ${document.querySelector('.selectedNota').value}
  Observações: ${document.querySelector('#textarea').value}`;
  return criarP;
}

function pegarCheckFamily() {
  const checked = document.querySelectorAll('.checkForm');

  for (let index = 0; index < checked.length; index += 1) {
    const element = checked[index];

    element.addEventListener('click', (event) => {
      const removerSelecionado = document.querySelectorAll('.selectedFamily');

      for (let rmv = 0; rmv < removerSelecionado.length; rmv += 1) {
        removerSelecionado[rmv].classList.remove('selectedFamily');
      }
      event.target.classList.add('selectedFamily');
    });
  }
}
pegarCheckFamily();

function pegarCheckNota() {
  const checked = document.querySelectorAll('.checkNota');

  for (let index = 0; index < checked.length; index += 1) {
    const element = checked[index];

    element.addEventListener('click', (event) => {
      const removerSelecionado = document.querySelectorAll('.selectedNota');

      for (let rmv = 0; rmv < removerSelecionado.length; rmv += 1) {
        removerSelecionado[rmv].classList.remove('selectedNota');
      }
      event.target.classList.add('selectedNota');
    });
  }
}
pegarCheckNota();

function enviarForm(evnt) {
  const form = document.querySelector('#evaluation-form');
  const imgs = document.querySelector('.removeImg');
  evnt.preventDefault();
  const teste = pegarValores();
  imgs.innerHTML = '';
  form.innerHTML = '';
  form.appendChild(teste);
}
document.querySelector('#submit-btn').addEventListener('click', enviarForm);
