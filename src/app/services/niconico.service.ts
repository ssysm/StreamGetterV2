import { Injectable } from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class NiconicoService {

  constructor(
    private electronService: ElectronService
  ) {
  }

  requestLink(videoId) {
    return this.electronService.ipcRenderer.send('niconico_requestLink', {videoId});
  }

  closeSocket() {
    return this.electronService.ipcRenderer.send('niconico_stopAlive');
  }
}
