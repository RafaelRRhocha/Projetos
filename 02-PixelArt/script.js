function colorFunction() {
  const gerarCor = document.querySelector('#color-palette');
  const listaCores = ['', '', ''];
  for (let i = 0; i < listaCores.length; i += 1) {
    const listaCor = listaCores[i];

    const divColor = document.createElement('div');

    divColor.style.backgroundColor = gerar_cor_hexadecimal();

    divColor.classList.add('color');
    divColor.innerHTML = listaCor;
    gerarCor.appendChild(divColor);
  }

  function gerar_cor_hexadecimal() {
    //Vi nesse site como gerar uma cor aleatória: https://wallacemaxters.com.br/blog/2021/02/20/como-gerar-cores-aleatorias-no-javascript
    return (
      '#' +
      parseInt(Math.random() * 0xfff)
        .toString(16)
        .padStart(3, '0')
    );
  }
}
colorFunction();

const idBtn = document.querySelector('#generate-board');
idBtn.addEventListener('click', gerarPixels);

function gerarPixels() {
  const classPixel = document.querySelector('#pixel-board');
  classPixel.innerHTML = '';

  const idInput = document.querySelector('#board-size');
  let valueInput = idInput.value;
  let tamanho = valueInput;

  if (tamanho === '' || tamanho <= 0) {
    alert('Board inválido!');
    tamanho = 5;
  } else if (tamanho <= 5) {
    tamanho = 5;
  } else if (tamanho >= 50) {
    tamanho = 50;
  }
  for (let boardQuadro = 0; boardQuadro < tamanho; boardQuadro += 1) {
    const divQuadro = document.querySelector('#pixel-board');
    const divLinha = document.createElement('div');
    divQuadro.appendChild(divLinha);

    for (let boardLinhas = 0; boardLinhas < tamanho; boardLinhas += 1) {
      const pixels = document.createElement('div');
      pixels.classList.add('pixel');
      divQuadro.appendChild(pixels);
    }
  }
}
gerarPixels();

function colorSelected() {
  const mycolors = document.querySelectorAll('.color');

  for (let index = 0; index < mycolors.length; index += 1) {
    const element = mycolors[index];

    element.addEventListener('click', (event) => {
      const removerSelecionado = document.querySelectorAll('.selected');

      for (let rmv = 0; rmv < removerSelecionado.length; rmv += 1) {
        removerSelecionado[rmv].classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
}
colorSelected();

function pintarGrid() {
  //Fiz esse exercício com a ajuda da colega giovanna morais, links que usamos de referencia:
  //https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
  //https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue
  //Referencia das arrow functions: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  const pixelGrid = document.getElementsByClassName('pixel');
  for (let pixelColor = 0; pixelColor < pixelGrid.length; pixelColor += 1) {
    pixelGrid[pixelColor].addEventListener('click', () => {
      const corSelecionada = document.querySelector('.selected');
      const corSelecionadacss = window.getComputedStyle(corSelecionada);
      const cssEstilo = corSelecionadacss.getPropertyValue('background-color');
      pixelGrid[pixelColor].style.backgroundColor = cssEstilo;
    });
  }
}
pintarGrid();

function clear() {
  const pixelsClear = document.getElementsByClassName('pixel');
  const clearAll = document.getElementById('clear-board');
  clearAll.addEventListener('click', () => {
    for (let z = 0; z < pixelsClear.length; z += 1) {
      pixelsClear[z].style.backgroundColor = 'white';
    }
  });
}
clear();
