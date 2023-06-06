import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelDetailsGuardGuard } from './shared/guards/hotel-details-guard.guard';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RouterModule } from '@angular/router';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { HotelEditGuard } from './shared/guards/hotel-edit.guard';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'hotels/:id', component: HotelDetailComponent, canActivate: [HotelDetailsGuardGuard] },
      { path: 'hotels', component: HotelListComponent },
      {
        path: 'hotels/:id/edit',
        component: HotelEditComponent,
        canDeactivate: [HotelEditGuard]
      },
    ]
    ),
  ],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
