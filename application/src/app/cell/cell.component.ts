import { Component, Input, OnInit } from '@angular/core';
import { PLAYERS } from '../enums/enums';
import { MiniGameService } from '../service/mini-game.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() x: number = 0;

  @Input() y: number = 0;

  @Input() yRow: PLAYERS | undefined;

  public PLAYERS = PLAYERS;

  constructor(
    public service: MiniGameService,
  ) { }

  ngOnInit(): void {
  }

  onCellClick(x: number, y: number) {
    this.service.gameAction({ x, y }, PLAYERS.PLAYER)
  }

}
