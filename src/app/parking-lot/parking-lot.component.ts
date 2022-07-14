import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ParkingLotService } from './parking-lot.service';
import { Car, Slot, ParkingLotViewModel, ParkGateStatus } from './types';

@Component({
  selector: 'app-parking-lot',
  template: `
    <section>
      <header *ngIf="viewModel$ | async as viewModel">
        <h1>Parking Lot</h1>
        <p>
          Available Slots - {{ viewModel.availableSlotCount }}/{{
            viewModel.totalSlotCount
          }}
          - ({{ viewModel.status }})
        </p>
      </header>
      <app-entrance
        (onCarEntered)="handleNewCarEntered($event)"
        (onParkGateStatusChanged)="handleParkGateStatusChanged($event)"
      ></app-entrance>
      <div class="grid">
        <ng-container *ngFor="let slot of slots$ | async">
          <app-slot
            [data]="slot"
            (onCarExit)="handleCarExit($event)"
          ></app-slot>
        </ng-container>
      </div>
    </section>
  `,
  styleUrls: ['./parking-lot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParkingLotComponent implements OnInit {
  slots$: Observable<Slot[]> = this.parkingLotService.slots$;
  viewModel$: Observable<ParkingLotViewModel> =
    this.parkingLotService.viewModel$;

  handleNewCarEntered(newCar: Car) {
    this.parkingLotService.addCarToSlot(newCar);
  }

  handleCarExit(slot: Slot) {
    this.parkingLotService.removeCarFromSlot(slot);
  }

  handleParkGateStatusChanged(status: ParkGateStatus) {
    this.parkingLotService.updateParkingLotGateStatue(status);
  }

  constructor(private parkingLotService: ParkingLotService) {}

  ngOnInit(): void {}
}
