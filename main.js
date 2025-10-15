const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const data = require('./data')
const templateGenerator = require('./template')

let tray = null;
let mainWindow = null;
app.on('ready', () => {
    console.log('Aplicação iniciada');
    mainWindow = new BrowserWindow({
        width: 800,
        heigth:600
    });

    tray = new Tray(__dirname + '/app/img/icon-tray.png');
    let template = templateGenerator.geraTrayTemplate(mainWindow);
    let trayMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(trayMenu);





    let sobreWindow = null;
    ipcMain.on('abrir-janela-sobre', () => {
        if (sobreWindow == null){
          sobreWindow = new BrowserWindow({
              width:300,
              height:220,
              alwaysOnTop: true,
              frame: false
        });
        sobreWindow.on('closed', () =>{
           sobreWindow = null;
        })


    }

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);

});

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
});
ipcMain.on('teste',(event,teste) => {
  console.log(`teste =  ${teste}` );
});

ipcMain.on('curso-parado',(event,curso, tempoEstudado) => {
    console.log(`O curso ${curso} foi estudado por ${tempoEstudado }`);
    data.salvaDados(curso, tempoEstudado);
});

ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templateGenerator.adicionaCursoNoTray(novoCurso, mainWindow);
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
    tray.setContextMenu(novoTrayMenu);
});


    let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app);
    let menuPrincipal = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(menuPrincipal);

    mainWindow.openDevTools();

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

});

app.on('window-all-closed', () =>{
   app.quit();
});
