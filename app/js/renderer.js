const { ipcRenderer } = require('electron');
const timer = require('./timer');
//const moment = require('moment');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
let play = false;
botaoPlay.addEventListener('click', function (){
    //comando console é apenas para teste
  //  console.log('Pre inversao', imgs);
    if (play){
          timer.parar();
          play = false;
    }else{
          timer.iniciar(tempo);
          play = true;
    }

    imgs = imgs.reverse();
  //  console.log(moment().format()); //
    //console.log('POs inversao', imgs);
    botaoPlay.src = imgs[0];

});
