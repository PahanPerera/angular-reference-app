import { nanoid } from 'nanoid';

export type ParkGateStatus = 'OPEN' | 'CLOSED';
export interface Car {
  readonly plateNumber: string;
}
export interface Slot {
  readonly id: string;
  readonly status: 'EMPTY' | 'RESERVED' | 'OCCUPIED';
  readonly car?: Car;
}
export interface ParkingLotState {
  slots: Slot[];
  status: ParkGateStatus;
}

export interface ParkingLotViewModel {
  totalSlotCount: number;
  availableSlotCount: number;
  status: ParkGateStatus;
}

export const newEmptySlot = (): Slot => {
  return { id: nanoid(6), status: 'EMPTY' };
};

export const newCar = (): Car => {
  return { plateNumber: nanoid(6) };
};
