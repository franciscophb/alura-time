const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');
//const moment = require('moment');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = () => {
    data.pegaDados(curso.textContent)
    .then ((dados) => {
        console.log(dados);
        tempo.textContent = dados.tempo;
    })
}

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false;
botaoPlay.addEventListener('click', function (){
    //comando console é apenas para teste
  //  console.log('Pre inversao', imgs);
    if (play){
          timer.parar(curso.textContent);
          play = false;
          new Notification('Alurat Timer',{
            body: `O curso ${curso.textContent} parado!`,
            icon: 'img/icon.png'
          });
    }else{
          timer.iniciar(tempo);
          play = true;
          new Notification('Alurat Timer',{
            body: `O curso ${curso.textContent} iniciado!`,
            icon: 'img/icon.png'
          });
    }

    imgs = imgs.reverse();
  //  console.log(moment().format()); //
    //console.log('POs inversao', imgs);
    botaoPlay.src = imgs[0];

});

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    timer.parar(curso.textContent);
    data.pegaDados(nomeCurso)
      .then((dados) => {
          tempo.textContent = dados.tempo;
      }).catch((err) => {
        console.log('O curso ainda não possui um JSON');
        tempo.textContent = "00:00:00";
      })
    curso.textContent = nomeCurso;
    console.log('curso foi trocado', nomeCurso);
});

botaoAdicionar.addEventListener('click', function(){

    if (campoAdicionar.value ==''){
      console.log('não posso adicionar um curso com nome vazio');
      return;
    }

    let novoCurso = campoAdicionar.value;
    curso.textContent = novoCurso;
    tempo.textContent = '00:00:00';
    campoAdicionar.value = '';
    ipcRenderer.send('curso-adicionado', novoCurso);
});

ipcRenderer.on('atalho-iniciar-parar', () => {
  console.log('atalho executado');
  let click = new MouseEvent('click');
  botaoPlay.dispatchEvent(click);
});
