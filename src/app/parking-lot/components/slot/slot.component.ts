import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Slot } from '../../types';

@Component({
  selector: 'app-slot',
  template: `
    <div
      class="slot"
      [ngClass]="{
        empty: data?.status === 'EMPTY',
        reserved: data?.status === 'RESERVED',
        occupied: data?.status === 'OCCUPIED'
      }"
    >
      Id - {{ data?.id }}
      <br />
      {{ data?.car | json }}

      <button *ngIf="data?.car" class="button" (click)="exit()">Exit</button>
    </div>
  `,
  styleUrls: ['./slot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotComponent implements OnInit {
  @Input()
  data?: Slot;

  @Output()
  onCarExit = new EventEmitter<Slot>();

  constructor() {}

  ngOnInit(): void {}

  exit() {
    this.onCarExit.emit(this.data);
  }
}
