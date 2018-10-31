import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BilibiliService {

  constructor(
    private http: HttpClient
  ) { }

  getRealRoomId(roomId) {
    return this.http.get('https://api.live.bilibili.com/room/v1/Room/room_init?id=' + roomId);
  }

  getStream(realRoomId) {
    return this.http.get('https://api.live.bilibili.com/api/playurl?cid=' + realRoomId + '&otype=json&quality=0&platform=web');
  }
}
