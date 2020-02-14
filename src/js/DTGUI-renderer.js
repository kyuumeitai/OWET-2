const { ipcRenderer } = require('electron');
function cmdBtn(cmd) {
    console.log('runnin')
    ipcRenderer.send('runConsoleCmd', {cmd: cmd})
    

}
let consoleElement = document.getElementById("console")
let consoleWrapper = document.getElementById("consoleWrapper");
let queueList = document.getElementById("queueList");
let btnContainer = document.getElementById('btnContainer');
let consoleText = '';
ipcRenderer.on('updateConsole', (event, args) =>{
    const maxChars =150000;
    consoleText+= args.data;
    consoleText = consoleText.substr(consoleText.length - maxChars);
    consoleElement.textContent = consoleText
    //consoleElement.scrollTop = consoleElement.scrollHeight;
})

ipcRenderer.on('updateQueue', (event, args) =>{
    queueList.innerHTML = args.data;
});

ipcRenderer.on('addBtn', (event, args)=> {
    let btnDiv = document.createElement('div');
    btnDiv.className = 'buttonContainerStatic';

    let btnAnchor = document.createElement('a');
    btnAnchor.className = 'button';
    btnAnchor.addEventListener('click', ()=>cmdBtn(args.cmd));
    btnAnchor.innerHTML = args.text;

    btnDiv.appendChild(btnAnchor);

    btnContainer.appendChild(btnDiv);


})

ipcRenderer.send('DTLoaded',{});