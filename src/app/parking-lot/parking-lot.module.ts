import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingLotComponent } from './parking-lot.component';
import { ParkingLotService } from './parking-lot.service';
import { SlotComponent } from './components/slot/slot.component';
import { EntranceComponent } from './components/entrance/entrance.component';

@NgModule({
  declarations: [ParkingLotComponent, SlotComponent, EntranceComponent],
  imports: [CommonModule],
  providers: [ParkingLotService],
  exports: [ParkingLotComponent],
})
export class ParkingLotModule {}
