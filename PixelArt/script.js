// Exercício 02 (01 e 03 foram feitos via html e css)
function colorFunction() {
    const gerarCor = document.querySelector('#color-palette');
    const listaCores = ['','','',]
    for (let i = 0; i < listaCores.length; i+=1) {
        const listaCor = listaCores[i];

        const divColor = document.createElement('div');
        
        divColor.style.backgroundColor = gerar_cor_hexadecimal();

        divColor.classList.add('color');
        divColor.innerHTML = listaCor;
        gerarCor.appendChild(divColor);    
    }

function gerar_cor_hexadecimal(){
    //Vi nesse site como gerar uma cor aleatória: https://wallacemaxters.com.br/blog/2021/02/20/como-gerar-cores-aleatorias-no-javascript
  return '#' + parseInt((Math.random() * 0xFFF))
    .toString(16)
    .padStart(3, '0');
}
};
colorFunction();


function gerarPixels() {
  const tamanho = 5;

  for (let quadroLat = 0; quadroLat < tamanho; quadroLat += 1) {
    const divQuadro = document.querySelector('#pixel-board');
    const divLinha = document.createElement('div');
    divQuadro.appendChild(divLinha);

    for (let p = 0; p < tamanho; p += 1) {
      const pixels = document.createElement('div');
      pixels.classList.add('pixel');
      divQuadro.appendChild(pixels);
    }
  }
};
gerarPixels();