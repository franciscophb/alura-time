const  { ipcRenderer }  = require('electron');
const moment = require('moment');
let segundos;
let timer;
let tempo;

module.exports = {
    iniciar(el){
      tempo = moment.duration(el.textContent);
      //console.log(tempo.asSeconds());
      segundos = tempo.asSeconds();
      //let self = this;
      //console.log("limpou o timer id: ", timer);
      clearInterval(timer);
      timer = setInterval(() => {
                segundos++;
                el.textContent = this.segundosParaTempo(segundos);
                }, 1000);
                //console.log("Inicia o timer: ",timer);
              },parar(curso){
                  clearInterval(timer);

                  let tempoEstudado = this.segundosParaTempo(segundos);
                  ipcRenderer.send('curso-parado',curso, tempoEstudado);
                  //console.log(curso,' e ', tempoEstudado);
                  console.log(curso, tempoEstudado);
                  let teste = 'testado';
                  ipcRenderer.send('teste',teste);
              },segundosParaTempo(segundos){
      return moment().startOf('day').seconds(segundos).format("HH:mm:ss");
      }

}
