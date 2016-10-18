import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';

import { GamesService } from './games.service';
import { GamePreviewComponent } from './game-preview/game-preview.component';

import { YoutubePlayerModule } from 'ng2-youtube-player';

@NgModule({
  declarations: [
    AppComponent,
    GamePreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    YoutubePlayerModule
  ],
  providers: [GamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
