import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { StarRatingComponent } from '../shared/component/star-rating/star-rating.component';
import { ReplaceComma } from '../shared/pipes/replace-comma.pipe';
import { RouterModule } from '@angular/router';
import { HotelDetailsGuardGuard } from './shared/guards/hotel-details-guard.guard';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HotelData } from './shared/api/hotel.data';

@NgModule({
  declarations: [
    HotelListComponent,
    HotelDetailComponent,
    HotelEditComponent,
  ],
  imports: [
    SharedModule,
    HotelRoutingModule,
    InMemoryWebApiModule.forFeature(HotelData)
  ]
})
export class HotelModule { }
