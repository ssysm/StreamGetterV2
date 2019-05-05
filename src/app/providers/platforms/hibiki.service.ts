import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HibikiService {

  constructor(
    private http: HttpClient
  ) { }

  public requestProgramId(accessId: string): Observable<HibikiResponse.RootObject> {
    return this.http.get<HibikiResponse.RootObject>('https://vcms-api.hibiki-radio.jp/api/v1/programs/' + accessId, {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    });
  }

  public requestStream(programId: number ): Observable<HibikiResponse.Stream> {
    return this.http.get<HibikiResponse.Stream>('https://vcms-api.hibiki-radio.jp/api/v1/videos/play_check?video_id=' + programId, {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    });
  }
}
