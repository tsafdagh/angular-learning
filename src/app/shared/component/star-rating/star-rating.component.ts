import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {

  public starWith!: number;

  @Input()
  public rating!: number;

  @Output()
  public starRatingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    this.starWith = this.rating * 125 / 5
  }

  public sendRating(): void {
    this.starRatingClicked.emit(`La note émise est de : ${this.rating}`)
  }
}
