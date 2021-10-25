import { Component, OnInit } from '@angular/core';
import { EVENTS, PLAYERS } from '../enums/enums';
import { MiniGameService } from '../service/mini-game.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mini-game-view',
  templateUrl: './mini-game-view.component.html',
  styleUrls: ['./mini-game-view.component.scss']
})
export class MiniGameViewComponent implements OnInit {
  public time: number = 0;
  public PLAYERS = PLAYERS;
  public openModal = false;

  private unsubscribe$ = new Subject();

  constructor(
    public service: MiniGameService
  ) { }

  ngOnInit(): void {
    this.service.createField();
    this.service.events$.pipe(
      takeUntil(this.unsubscribe$),
    )
      .subscribe((event: EVENTS) => {
        if (event === EVENTS.FINISH_GAME) {
          this.openModal = true;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  startGame() {
    this.service.startRound(this.time);
  }

  closeModal() {
    this.openModal = false;
    this.service.clearGame();
  }
}
