// Começo do Projeto! 

//Pinta um quadro do grid com a cor selecionada;
function colorGrid(click) {
  const selectedColor = document.getElementsByClassName('selected')[0];
  const style = window.getComputedStyle(selectedColor);
  const clickTarget = click.target;
  clickTarget.style.backgroundColor = style.getPropertyValue('background-color');
}

// function checando os valores
function checkingNumbers() {
  let valor = document.getElementById('board-size').value;
  if (valor >= 50) {
    valor = 50;
  } else if (valor <= 9) {
    valor = 9;
  }
  return valor;
}
const generateBoard = document.getElementById('generate-board');
generateBoard.addEventListener('click', checkingNumbers);
// gerar o grid de acordo com o input do usuário;
function modularGrid() {
  const parentElement = document.querySelector('#pixel-board');
  const remove = document.querySelectorAll('.pixel');
  remove.forEach((element) => {
    element.remove();
  });
  for (let index = 0; index < checkingNumbers(); index += 1) {
    const row = document.createElement('div');
    row.className = 'row';
    parentElement.appendChild(row);
    for (let index2 = 0; index2 < checkingNumbers(); index2 += 1) {
      const squares = document.createElement('div');
      squares.className = 'pixel';
      row.appendChild(squares);
      squares.addEventListener('click', colorGrid);
    }
  }
}
modularGrid();
generateBoard.addEventListener('click', modularGrid);
// Coloca a classe de ativado para a div que foi selecionada pelo usuário;
function activeColor(click) {
  const allColors = document.querySelectorAll('.color');

  for (let index = 0; index < allColors.length; index += 1) {
    allColors[index].classList.remove('selected');
    click.target.classList.add('selected');
  }
}
// função para gerar a paleta de cores
function generateColorPalette(number) {
  const parentElement = document.getElementById('color-palette');
  for (let index = 0; index < number; index += 1) {
    const palette = document.createElement('div');
    palette.classList.add('color');
    parentElement.appendChild(palette);
  }
}
generateColorPalette(3);
// Coloca o addEventListener nas 4 cores da paleta;
const colors = document.getElementsByClassName('color');
for (let index = 0; index < colors.length; index += 1) {
  colors[index].addEventListener('click', activeColor);
}
// Faz com que ao clicar no botão o quadro fique limpo;
const pixel = document.getElementsByClassName('pixel');
function clearBoard() {
  for (let index = 0; index < pixel.length; index += 1) {
    pixel[index].style.backgroundColor = 'white';
  }
}
const button = document.querySelector('#clear-board');
button.addEventListener('click', clearBoard);
// fazer com que as cores da paleta sejam geradas automaticamente
function randomColor() {
  // vi onde que fazia uma cor aleatória nesse site: https://css-tricks.com/snippets/javascript/random-hex-color/
  const noColorSquares = document.querySelectorAll('.color');

  for (let index = 0; index < noColorSquares.length; index += 1) {
    const randomizeColor = Math.floor(Math.random() * 16777215).toString(16);
    if (noColorSquares[index].id !== 'black') {
      noColorSquares[index].style.backgroundColor = `#${randomizeColor}`;
    }
  }
}
randomColor();
// alerta quando o input estiver sem numero;
function attention() {
  const input = document.getElementById('board-size');

  if (input.value === '') {
    window.alert('Board inválido!');
  }
}
generateBoard.addEventListener('click', attention);
