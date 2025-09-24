const {ipcRenderer, shell} =  require('electron');
const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkInstagram = document.querySelector("#link-Instagram");
let versaoElectron = document.querySelector('#versão-electron');

window.onload = function(){
  versaoElectron.textContent = process.versions.electron;
}

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
});

linkInstagram.addEventListener('click', function () {
    shell.openExternal("https://www.instagram.com/franciscoojuaraphb/");
});
