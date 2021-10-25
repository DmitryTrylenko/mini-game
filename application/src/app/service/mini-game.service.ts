import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PLAYERS, EVENTS } from '../enums/enums';
import { CoordsModel } from '../models/coords.model';
import { ScoreModel } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class MiniGameService {
  public field: PLAYERS[][] = [];
  public coords: CoordsModel = { x: 15, y: 15 };
  public events$ = new Subject<EVENTS>();
  public timeout: number = 0;
  public time: number = 0;
  public countWins: number = 10;
  public gameWinner: PLAYERS | null = null;
  public score: ScoreModel = {
    playerScore: 0,
    computerScore: 0,
  };

  constructor() {
    this.field = this.createField();
  }

  public createField(): PLAYERS[][] {
    const field = [];

    for (let i = 0; i < 10; i++) {
      field.push(new Array(10).fill(PLAYERS.EMPTY));
    }

    return field;
  }

  public startRound(time: number) {
    this.time = time;
    this.coords = this.createCoords();
    this.events$.next(EVENTS.START_ROUND);
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = window.setTimeout(() => {
      this.gameAction(this.coords, PLAYERS.COMPUTER);
    }, time);
  }

  public createCoords(cellNum?: number): CoordsModel {
    let randomCell = cellNum || Math.floor(Math.random() * 100);
    let coords = this.getCoordinates(randomCell);

    if (this.field[coords.x][coords.y] !== PLAYERS.EMPTY) {
      this.createCoords(++randomCell);
    }

    return coords;
  }

  public gameAction({ x, y }: CoordsModel, player: PLAYERS) {
    if (x !== this.coords.x || y !== this.coords.y) {
      return;
    }
    this.increaseScore(player);
    this.field[x][y] = player;

    this.gameWinner = this.getWinnerPlayer();

    if (this.gameWinner) {
      this.events$.next(EVENTS.FINISH_GAME);
      return;
    }

    this.startRound(this.time);
  }

  public clearGame() {
    this.coords = { x: 15, y: 15 };
    this.field = this.createField();
    this.score = {
      playerScore: 0,
      computerScore: 0,
    };
  }

  private getCoordinates(randomCell: number): CoordsModel {
    const x = Math.trunc(randomCell / 10);
    const y = randomCell - (x * 10);

    return { x, y };
  }

  private getWinnerPlayer() {
    if (this.score.computerScore >= this.countWins) {
      return PLAYERS.COMPUTER;
    }

    if (this.score.playerScore >= this.countWins) {
      return PLAYERS.PLAYER;
    }

    return null;
  }

  private increaseScore(player: PLAYERS) {
    if (player === PLAYERS.COMPUTER) {
      this.score.computerScore++;
    } else {
      this.score.playerScore++;
    }
  }
}
