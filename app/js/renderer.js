//console.log('Eu estou na janela do browser');
const { ipcRenderer } = require('electron');

let linkSobre = document.querySelector('#link-sobre');

linkSobre.addEventListener('click' , function(){
   ipcRenderer.send('abrir-janela-sobre');
});
