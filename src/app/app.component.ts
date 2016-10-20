import { Component, OnInit } from '@angular/core';
import { GamesService } from './games.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import * as _ from 'lodash';

import {URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', './tags.scss', './card.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  // games = {};
  games = [];
  expansions = [];
  selectedGame = undefined;
  username : String;

  constructor(private gameService: GamesService) {
    var url = new URLSearchParams(location.search);
    this.username = url.get('?user');
    
    // var url = new URL(window.location.toString());
    // this.username = url.searchParams.get('?user') || 'tagazok';
  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.gameService.getAll(this.username)
    // .mergeMap(games => {
    //   return Observable.forkJoin(games.map(game => {
    //     return this.gameService.get(game.gameId);
    //   }))
    // }).subscribe(results => {
    //   debugger;
    //   for(let game of results) {
    //     if (game.owned) {
    //       if (!game.isExpansion) {
    //         this.games[game.gameId + ''] = game;
    //       }
    //     }
    //   }
    // });
    .subscribe(games => {
      for (let game of games) {
        if (game.owned) {
          if (!game.isExpansion) {
            this.games.push(game);
          } else {
            this.expansions.push(game);
          }
        }
      }
    })
  }

  selectGame(game) {
    this.selectedGame = game;
    if (!this.selectedGame.details) {
      this.gameService.get(game.gameId)
      .subscribe(result => {
        result.description = result.description.replace(/&#10;/g, "<br>");
        this.selectedGame.details = result;
        this.selectedGame.myExpansions = _.intersectionBy(this.expansions, result.expansions, 'name');
      });


      this.gameService.getImages(game.gameId, 5)
      .subscribe(result => {
        this.selectedGame.images = result.images;
      });

       this.gameService.getVideos(game.gameId, 2)
      .subscribe(result => {
        this.selectedGame.videos = result.videos;
      });

    }
  }
}
