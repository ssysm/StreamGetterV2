import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnsenagService {

  constructor(
    private http: HttpClient
  ) { }

  getCallBack(programName: string) {
    return this.http.get('http://www.onsen.ag/data/api/getMovieInfo/' + programName, {responseType: 'text'});
  }
}
