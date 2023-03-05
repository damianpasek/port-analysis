import { Vessel } from '../types/api'

export enum VesselId {
  ID_1 = 123,
  ID_2 = 456,
}

export const MockedVessels = [
  {
    imo: VesselId.ID_1,
    name: 'Vessel 1',
  },
  {
    imo: VesselId.ID_2,
    name: 'Vessel 2',
  },
] as Vessel[]
