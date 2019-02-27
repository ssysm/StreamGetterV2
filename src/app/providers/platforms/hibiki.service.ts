import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HibikiService {

  constructor(
    private http: HttpClient
  ) { }

  requestVideoId(accessId) {
    return this.http.get('https://vcms-api.hibiki-radio.jp/api/v1/programs/' + accessId, {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    });
  }

  requestStream(videoId) {
    return this.http.get('https://vcms-api.hibiki-radio.jp/api/v1/videos/play_check?video_id=' + videoId, {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    });
  }
}
