import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MiniGameService } from '../service/mini-game.service';

@Component({
  selector: 'app-modal-result',
  templateUrl: './modal-result.component.html',
  styleUrls: ['./modal-result.component.scss']
})
export class ModalResultComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    public service: MiniGameService
  ) { }

  ngOnInit(): void {
  }

}
