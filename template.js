const data = require('./data');
const { ipcMain, Menu} = require('electron');

module.exports = {
  templateInicial:null,
  geraTrayTemplate(win){
    let template = [
      {
        'label':'Cursos'
      },
      {
        type: 'separator'
      }
    ];

    let cursos = data.pegaNomeDosCursos();
      cursos.forEach((curso) => {
          let menuItem = {
              label: curso,
              type: 'radio',
              click: () => {
                win.send('curso-trocado', curso);
                console.log(curso);
              }
            };


      template.push(menuItem);
    });
    this.templateInicial = template;
    return template;
  },
  adicionaCursoNoTray(curso,win){
      this.templateInicial.push({
          label: curso,
          type: 'radio',
          checked:true,
          click: () => {
            win.send('curso-trocado', curso);
            console.log(curso);
          }
        })
        return this.templateInicial;
  },
  geraMenuPrincipalTemplate(app,mainWindow){
    let templateMenu = [
              {label:'View',
              submenu: [{role:'reload'},
                        {role:'toggleDevTools'},
                        {role:'close'}]
              },
              {label:'Window',
              submenu:[{role:'minimize'},
                       {role:'maximize'},
                        {role:'toggleDevTools'}]
              },
              {label: 'Sobre',
                submenu: [{label: 'Sobre o Alura Timer >',
                          click:() => {ipcMain.emit('abrir-janela-sobre');
                        },accelerator: 'CommandOrControl+I'
              },
              {label: 'Abrir opção de desenvolvimento >',
                  click: () => {
                    mainWindow.openDevTools();
                  }
                },
              {
                label: 'Alternar DevTools',
                click: (menuItem, browserWindow) => {
                  if (browserWindow) {
                    const isOpen = browserWindow.webContents.isDevToolsOpened();
                    if (isOpen) {
                      browserWindow.webContents.closeDevTools();
                    } else {
                      browserWindow.webContents.openDevTools();
                    }
                  } else {
                    console.log('Nenhuma janela ativa');
                  }
                }
              }
            ]
          }];
    if (process.plataform === 'darwin'){
        templateMenu.unshift({
            label: app.getName(),
            submenu:[
              {
                label:'Estou rodando no Mac!'
              }
            ]
        })
    }
    return templateMenu;
  }

}
