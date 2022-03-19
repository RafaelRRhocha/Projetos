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
  let valor = document.getElementById('btn-number').value;
  if (valor >= 50) {
    valor = 50;
  } else if (valor <= 9) {
    valor = 9;
  }
  return valor;
}

function randomColor() {
 // https://css-tricks.com/snippets/javascript/random-hex-color/
  const noColorSquares = document.querySelectorAll('.color');

  for (let index = 0; index < noColorSquares.length; index += 1) {
    const randomizeColor = Math.floor(Math.random() * 2022).toString(16);
    if (noColorSquares[index].id !== 'black' && noColorSquares[index].id !== 'white') {
      noColorSquares[index].style.backgroundColor = `#${randomizeColor}`;
    }
  }
}
randomColor();

// alerta quando o input estiver sem numero;
function alertInput() {
  const entradaValor = document.getElementById('btn-number');
  if (entradaValor.value === '') {
    window.alert('Board inválido!');
  }
}
generateBoard.addEventListener('click', alertInput);