import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NiconicoService {

  constructor(
    private http: HttpClient
  ) { }

  public requestLink(videoID) {
    return this.http.get('http://live2.nicovideo.jp/watch/lv' + videoID, {
      responseType: 'text'
   });
  }

  public createSocket(socketURL) {
    return new WebSocket(socketURL);
  }

}
