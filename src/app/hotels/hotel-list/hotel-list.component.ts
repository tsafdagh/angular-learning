import { Component, OnInit } from '@angular/core';
import { HotelListServiceService } from '../shared/services/hotel-list.service';
import { Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {


  public receivedRating!: string;
  public hotels!: IHotel[]
  public errMsg: String = "";

  constructor(private hotelListService: HotelListServiceService, private router: Router) {

  }

  receivedRatingClicked(message: string) {
    this.receivedRating = message;
  }

  ngOnInit(): void {
    this.hotelListService.getHotels().subscribe(
      {
        next: hotels => {
          this.hotels = hotels;
          this.filteredHotel = this.hotels;
        },
        error: err => this.errMsg = err
      }
    );
    this.hotelFilter = '';
  }

  public title = "Liste d'hotels";
  public showBadge = true;
  private _hotelFilter = "";
  public filteredHotel: IHotel[] = [];

  public toggleShowBadge(): void {
    this.showBadge = !this.showBadge;
  }

  public get hotelFilter(): string {
    return this._hotelFilter;
  }

  public set hotelFilter(filter: string) {
    this._hotelFilter = filter;

    this.filteredHotel = this.hotelFilter ? this.filterHotels(filter) : this.hotels;
  }

  handlenativateToDetails(hotelId: number) {
    this.router.navigateByUrl(`/hotels/${hotelId}`)
  }

  handlenativateToEdit(hotelId: number) {
    this.router.navigateByUrl(`/hotels/${hotelId}/edit`)
  }

  private filterHotels(criteria: string): IHotel[] {
    criteria = criteria.toLocaleLowerCase();
    const res = this.hotels.filter(
      (hotel: IHotel) => hotel.hotelName.toLocaleLowerCase().indexOf(criteria) != -1
    )

    return res;
  }
}
