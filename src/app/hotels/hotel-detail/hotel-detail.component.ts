import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from 'src/app/hotels/shared/models/hotel';
import { HotelListServiceService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public hotel: IHotel | undefined;

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private hotelService: HotelListServiceService
  ) {

  }

  ngOnInit(): void {
    const id: string | null = (this.route.snapshot.paramMap.get("id")) ?? null;

    if (id != null) {
      this.hotelService.getHotels().subscribe((hotels: IHotel[]) => {

        this.hotel = hotels.find(hotel => hotel.id == Number(id));
        console.log("Selected hotel: ", this.hotel);
      })
    }
  }

  public backToList():void {
    this.router.navigateByUrl("/hotels")
  }

}
