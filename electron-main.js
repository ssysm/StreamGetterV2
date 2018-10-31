const {app, BrowserWindow,Menu} = require('electron');
const ipc = require('electron').ipcMain;
const axios = require('axios');
const cheerio = require('cheerio');
const WebSocket = require('ws');
const path = require('path')
const url = require('url')

let win,socket;

function createWindow () {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      devTools: false
    }
  });

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

/////////////////Set Menu //////////////////

const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })

  // Edit menu
  template[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [
        { role: 'startspeaking' },
        { role: 'stopspeaking' }
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

/////////////////Nico Nico /////////////////


ipc.on('niconico_requestLink',requestLink);
ipc.on('niconico_stopAlive',stopAlive);

function requestLink(event,args) {
  console.log(args.videoId.videoId);
  axios.get('http://live2.nicovideo.jp/watch/lv'+args.videoId.videoId)
    .then(res => res.data)
    .then(data => {
      //parse HTML
      const $ = cheerio.load(data);
      //获取页面配置
      const config = JSON.parse($('#embedded-data').attr('data-props'));
      createSocket({
        //Socket链接
        socketURL: config.site.relive.webSocketUrl,
        //广播ID
        broadcastId: config.program.broadcastId
      });
    })
    //Promise错误
    .catch(e => {
      win.webContents.send('niconico_failed',{});
      console.error(e+"promise failed");
    });
}

function createSocket({ socketURL, broadcastId }){
  socket = new WebSocket(socketURL);
  socket.on('open', () => {
    console.log('Socket Opened');
    socket.send(JSON.stringify({
      type: 'watch',
      body: {
        command: 'getpermit',
        requirement: {
          broadcastId,
          route: '',
          stream: {
            protocol: 'hls',
            requireNewStream: true,
            priorStreamQuality: 'high',
            isLowLatency: true
          },
          room: {
            isCommentable: true,
            protocol: 'webSocket'
          }
        }
      }
    }));
  });
  socket.on('message', (data) => {
    data = JSON.parse(data);
    //just for debug
    //console.log(data);
    if (data.type === "ping") {
      //应答心跳包
      socket.send(JSON.stringify({
        type: 'pong',
        body: {}
      }));
      console.log('Heartbeat packet sent');
    } else if (data.type) {
      switch (data.body.command) {
        //回响时间
        case 'servertime':
          socket.send(JSON.stringify({
            type: 'watch',
            body: {
              command: 'watching',
              params: [broadcastId, '-1', '0']
            }
          }));
          console.log('Time response answered');
          break;
        //Console出m3u8播放列表
        case 'currentstream':
          win.webContents.send('niconico_responseStream', data.body.currentStream.uri);
          console.log('Got stream playlist at ' + data.body.currentStream.uri);
          break;
      }
    }
  });
}

function stopAlive() {
  socket.terminate();
  console.log('Socket service terminated.Have a good night.');
  win.webContents.send('niconico_socketClosed',true);
}
