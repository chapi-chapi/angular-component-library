import { Component, OnInit, Input } from '@angular/core';
import { ICard } from '../ICard';

@Component({
  selector: 'chapichapi-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class ChapiChapiCardComponent implements OnInit {
  @Input()
  card!: ICard;

  constructor() { }

  ngOnInit(): void {
  }

}
