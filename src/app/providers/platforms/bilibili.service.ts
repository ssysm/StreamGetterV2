import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {BilibiliRealRoomResponse, BilibiliStreamResponse} from '../../Interface/platforms/bilibili';

@Injectable({
  providedIn: 'root'
})
export class BilibiliService {

  constructor(
    private http: HttpClient
  ) { }

  public getRealRoomId(roomId: string): Observable<BilibiliRealRoomResponse> {
    return this.http.get<BilibiliRealRoomResponse>('https://api.live.bilibili.com/room/v1/Room/room_init?id=' + roomId);
  }

  public getStream(realRoomId: string): Observable<BilibiliStreamResponse> {
    return this.http.get<BilibiliStreamResponse>('https://api.live.bilibili.com/api/playurl?cid='
      + realRoomId +
      '&otype=json&quality=0&platform=web');
  }
}
