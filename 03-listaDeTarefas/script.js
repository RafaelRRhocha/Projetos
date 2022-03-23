const enterInput = document.getElementById('texto-tarefa');
const enterButton = document.getElementById('criar-tarefa');
const enterOl = document.getElementById('lista-tarefas');
const btnClear = document.getElementById('apaga-tudo');
const btnClearFinish = document.getElementById('remover-finalizados');

enterButton.addEventListener('click', () => {
  if (inputLength() > 0) {
    criarTarefas();
  }
});

enterInput.addEventListener('keypress', () => {
  if (inputLength() > 0 && event.which === 13) {
    criarTarefas();
  }
});

btnClear.addEventListener('click', () => {
  const pegarUl = document.getElementById('lista-tarefas');
  pegarUl.innerText = '';
});

btnClearFinish.addEventListener('click', () => {
  const pegarSelecionado = document.getElementsByClassName('completed');
  for (let c = 0; c < pegarSelecionado.length; c+=1) {
    pegarSelecionado[c].remove();
    
  }

});

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
    const removerSelecionado = document.querySelectorAll('.bgColor');

    for (let rmv = 0; rmv < removerSelecionado.length; rmv += 1) {
      removerSelecionado[rmv].classList.remove('bgColor');
    }
    event.target.classList.add('bgColor');
  });

  criarLi.addEventListener('dblclick', () => {
    criarLi.classList.toggle('completed');
  });
}
criarTarefas();
