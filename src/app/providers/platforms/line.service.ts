import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(
    private http: HttpClient
  ) { }

  getStream(channelId, broadcastId) {
    return this.http.get('https://live-api.line-apps.com/app/v3.2/channel/' + channelId + '/broadcast/' + broadcastId + '/player_status');
  }
}
