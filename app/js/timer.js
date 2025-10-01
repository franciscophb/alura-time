const moment = require('moment');
let segundos;
let timer;

module.exports = {
    iniciar(el){
      let tempo = moment.duration(el.textContent);
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
              },parar(){
                  clearInterval(timer)
              },segundosParaTempo(segundos){
      return moment().startOf('day').seconds(segundos).format("HH:mm:ss");
      }

}
