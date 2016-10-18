import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retryWhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/timer';

@Injectable()
export class GamesService {

  constructor(private http: Http) { }

  getAll(user) {
    let queryString = `https://bgg-json.azurewebsites.net/collection/${user}`;
    return this.http.get(queryString)
      .map(this.extractData);
  }

  get(gameId) {
    let queryString = `https://bgg-json.azurewebsites.net/thing/${gameId}`;
    return this.http.get(queryString)
      .retryWhen(
            function (attempts) {
              return attempts
                .zip(Observable.range(1, 3), function (_, i) { return i })
                .flatMap(function (i) {
                  console.log('delay retry by ' + i + ' second(s)');
                  return Observable.timer(i * 100);
                });
            }
          )
      .map(this.extractData);
  }

  getImages(gameId, count) {
    let queryString = `https://api.geekdo.com/api/images?objectid=${gameId}&objecttype=thing&showcount=${count}`;
    return this.http.get(queryString)
      .map(this.extractData);
  }
  
  getVideos(gameId, count) {
    let queryString = `https://api.geekdo.com/api/videos?objectid=${gameId}&objecttype=thing&showcount=${count}&sort=recent`;
    return this.http.get(queryString)
      .map(this.extractData);
  }

  private extractData(res: Response) {
     let body = res.json();
     return body || { };
  }
}