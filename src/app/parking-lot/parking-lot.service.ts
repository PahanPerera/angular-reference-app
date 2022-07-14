import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import produce from 'immer';
import { Observable, tap } from 'rxjs';
import {
  Car,
  newEmptySlot,
  ParkGateStatus,
  ParkingLotState,
  ParkingLotViewModel,
  Slot,
} from './types';

@Injectable()
export class ParkingLotService extends ComponentStore<ParkingLotState> {
  constructor() {
    super({
      slots: new Array(3).fill(0).map((_) => newEmptySlot()),
      status: 'OPEN',
    });
  }

  readonly slots$: Observable<Slot[]> = this.select(
    (state: ParkingLotState) => state.slots
  ).pipe(tap((slots: Slot[]) => console.log(slots)));

  readonly viewModel$: Observable<ParkingLotViewModel> = this.select(
    (state: ParkingLotState) => {
      let emptySlots = state.slots.filter(
        (slot: Slot) => slot.status === 'EMPTY'
      );
      return {
        totalSlotCount: state.slots.length,
        availableSlotCount: emptySlots.length,
        status: state.status,
      } as ParkingLotViewModel;
    }
  );

  readonly addCarToSlot = this.updater(
    (state: ParkingLotState, newCar: Car) => {
      return produce(state, (draft) => {
        if (state.status === 'CLOSED') throw new Error('Parking Lot is closed');
        const nextSlot = draft.slots.find(
          (slot: Slot) => slot.status === 'EMPTY'
        );
        if (!nextSlot) {
          throw new Error('No Empty Slots...!');
        }
        nextSlot.car = newCar;
        nextSlot.status = 'OCCUPIED';
      });
    }
  );

  readonly removeCarFromSlot = this.updater(
    (state: ParkingLotState, oldSlot: Slot) => {
      return produce(state, (draft) => {
        const currSlot = draft.slots.find(
          (slot: Slot) => slot.id === oldSlot.id
        );
        if (!currSlot)
          throw new Error('Could not find a slot with Id ' + oldSlot.id);
        currSlot.car = undefined;
        currSlot.status = 'EMPTY';
      });
    }
  );

  readonly updateParkingLotGateStatue = this.updater(
    (state: ParkingLotState, newStatus: ParkGateStatus) => {
      return produce(state, (draft) => {
        draft.status = newStatus;
      });
    }
  );
}
