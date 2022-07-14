import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ParkingLotModule } from './parking-lot/parking-lot.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ParkingLotModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
