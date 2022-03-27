const enterInput = document.getElementById('texto-tarefa');
const enterButton = document.getElementById('criar-tarefa');
const enterOl = document.getElementById('lista-tarefas');
const btnClear = document.getElementById('apaga-tudo');
const btnClearFinish = document.getElementById('remover-finalizados');
const btnClearSelected = document.getElementById('remover-selecionado');
const btnSalvar = document.getElementById('salvar-tarefas');
const btnCima = document.getElementById('mover-cima');
const btnBaixo = document.getElementById('mover-baixo');

//Referencia Arrow Functions: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions

enterButton.addEventListener('click', () => {
  if (inputLength() > 0) {
    criarTarefas();
  }
});

enterInput.addEventListener('keypress', () => {
  if (inputLength() > 0 && event.keyCode === 13) {
    criarTarefas();
  }
});

btnClear.addEventListener('click', () => {
  const pegarUl = document.getElementById('lista-tarefas');
  pegarUl.innerText = '';
});

btnClearFinish.addEventListener('click', () => {
  const pegarFinalizado = document.querySelectorAll('.completed');
  for (let c = 0; c < pegarFinalizado.length; c+=1) {
    pegarFinalizado[c].remove();
  }
});

btnClearSelected.addEventListener('click', () => {
  const pegarSelecionado = document.getElementsByClassName('selected');
  for (let f = 0; f < pegarSelecionado.length; f+=1) {
    pegarSelecionado[f].remove();
  }
});

btnSalvar.addEventListener('click', () => {
  localStorage.setItem('list', enterOl.innerHTML)
});

btnCima.addEventListener('click', () => {
  //fiz esse exercício com a ajuda dos colegas adalberto e ciro!
  //link de referencia do insertBefore: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore
  const selecionarCima = document.querySelector('.selected');
  if (selecionarCima !== enterOl.firstElementChild && selecionarCima) {
    enterOl.insertBefore(selecionarCima, selecionarCima.previousSibling);
  }
  console.log(selecionarCima);
})

btnBaixo.addEventListener('click', () => {
  const selecionarBaixo = document.querySelector('.selected');
  if (selecionarBaixo !== enterOl.lastElementChild && selecionarBaixo) {
    enterOl.insertBefore(selecionarBaixo, selecionarBaixo.nextSibling.nextSibling);
  }
})

window.onload = () => {
  enterOl.innerHTML = localStorage.getItem('list');
};

function inputLength() {
  return enterInput.value.length;
}
inputLength();

function criarTarefas() {
  let valorInput = enterInput.value;

  const criarLi = document.createElement('li');
  criarLi.innerText = valorInput;
  enterOl.appendChild(criarLi);
  enterInput.value = '';

  criarLi.addEventListener('click', (event) => {
    const removerSelecionado = document.querySelectorAll('.selected');

    for (let rmv = 0; rmv < removerSelecionado.length; rmv += 1) {
      removerSelecionado[rmv].classList.remove('selected');
    }
    event.target.classList.add('selected');
  });

  criarLi.addEventListener('dblclick', () => {
    //Referencia toggle: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
    criarLi.classList.toggle('completed');
  });
}
criarTarefas();
