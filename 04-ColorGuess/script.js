const pegarP = document.querySelector('#rgb-color');
const pegarClass = document.querySelectorAll('.ball');
const pegarAnswer = document.querySelector('#answer');
const pegarScore = document.querySelector('#score');
let score = 0;

document.querySelector('#reset-game').addEventListener('click', () => {
  pegarAnswer.innerText = 'Escolha uma cor';
  window.onload();
});

function gerarCor() {
  const r = parseInt(Math.random() * 255);
  const g = parseInt(Math.random() * 255);
  const b = parseInt(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function setarCores() {
  for (let index = 0; index < pegarClass.length; index += 1) {
    const element = pegarClass[index];

    element.style.backgroundColor = gerarCor();
    pegarP.innerHTML = pegarClass[Math.floor(Math.random() * 6)].style.backgroundColor;
  }
}
setarCores();

function verificarCores() {
  pegarScore.innerHTML = score;
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('ball')) {
      if (event.target.style.backgroundColor === pegarP.innerHTML) {
        pegarAnswer.innerHTML = 'Acertou!';
        score += 3;
        pegarScore.innerHTML = score;
        window.onload();
      } else {
        pegarAnswer.innerHTML = 'Errou! Tente novamente!';
      }
    }
  });
}
verificarCores();


window.onload = () => {
  setarCores();
};
