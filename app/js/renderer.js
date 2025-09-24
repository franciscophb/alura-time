const { ipcRenderer } = require('electron');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');


linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg']
botaoPlay.addEventListener('click', function functionName(){
    //comando console é apenas para teste
    //console.log('Pre inversao', imgs);
    imgs = imgs.reverse();
    //console.log('POs inversao', imgs);
    botaoPlay.src = imgs[0];

});
