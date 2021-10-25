import { Component, OnInit } from '@angular/core';
import { MiniGameService } from '../service/mini-game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(
    public service: MiniGameService
  ) { }

  ngOnInit(): void {
  }

}
