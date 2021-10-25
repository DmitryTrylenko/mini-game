import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiniGameViewComponent } from './mini-game-view/mini-game-view.component';
import { ScoreComponent } from './score/score.component';
import { ModalResultComponent } from './modal-result/modal-result.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    MiniGameViewComponent,
    ScoreComponent,
    ModalResultComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
