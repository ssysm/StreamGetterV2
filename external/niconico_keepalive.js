const axios = require('axios');
const cheerio = require('cheerio');
const WebSocket = require('ws');
const ipc = require('electron').ipcMain;
const { remote } = require('electron');
let socket = null,win;

ipc.on('niconico_requestLink',requestLink);
ipc.on('niconico_stopAlive',stopAlive);

function requestLink(event,args) {
  win = remote.getCurrentWindow() ;
  axios.get('http://live2.nicovideo.jp/watch/lv'+args.videoId)
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
      win.send('niconico_failed',{e});
      console.error(e);
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
  socket.close();
  win.webContents.send('niconico_socketClosed',true);
}

