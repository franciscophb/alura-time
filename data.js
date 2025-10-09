const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
  salvaDados(curso, tempoEstudado){
    let arquivoDoCurso = __dirname + '/data/'+ curso + '.json';
    if(fs.existsSync(arquivoDoCurso)){
        //salvar os dados
        this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado);
    }else{
        //criar e salvar
        this.criaArquivoDeCurso(arquivoDoCurso,{})
          .then(() =>{
          //salvar dados
          this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado);
          })
      }
  },
  adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado ){
      //objeto que é salvo no arquivoDoCurso
      let dados = {
         ultimoEstudo: new Date().toString(),
         tempo: tempoEstudado
      }

      jsonfile.writeFile(arquivoDoCurso, dados, {spaces:2})
          .then(() => {
              console.log('Tempo salvo com sucesso');
          }).catch((err) => {
              console.log(err);
          })
  },

  criaArquivoDeCurso(nomeArquivo, conteudoArquivo){
      return jsonfile.writeFile(nomeArquivo,conteudoArquivo)
          .then(()=>{
            console.log('Arquivo Criado')
          }).catch((err)=>{
            console.log(err);
          });
      },
      pegaDados(curso){
        let arquivoDoCurso = __dirname + '/data/'+ curso + '.json';
        return jsonfile.readFile(arquivoDoCurso);
      }
  }
