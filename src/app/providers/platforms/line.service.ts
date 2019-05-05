import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor(
    private http: HttpClient
  ) { }

  public getStream(channelId: number, broadcastId: number): Observable<LineLiveResponse.RootObject> {
    return this.http.get<LineLiveResponse.RootObject>('https://live-api.line-apps.com/app/v3.2/channel/' + channelId + '/broadcast/' + broadcastId + '/player_status');
  }
}
