import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Car, newCar, ParkGateStatus } from '../../types';

@Component({
  selector: 'app-entrance',
  template: `
    <button (click)="enterCar()">Enter Car</button>
    <button (click)="toggleGate()">Toggle Parking</button>
  `,
  styleUrls: ['./entrance.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntranceComponent implements OnInit {
  @Output()
  onCarEntered = new EventEmitter<Car>();

  @Output()
  onParkGateStatusChanged = new EventEmitter<ParkGateStatus>();

  isParkOpen = true;

  constructor() {}

  ngOnInit(): void {}

  enterCar() {
    this.onCarEntered.emit(newCar());
  }

  toggleGate() {
    if (this.isParkOpen) {
      this.isParkOpen = false;
      this.onParkGateStatusChanged.emit('CLOSED');
    } else {
      this.isParkOpen = true;
      this.onParkGateStatusChanged.emit('OPEN');
    }
  }
}
