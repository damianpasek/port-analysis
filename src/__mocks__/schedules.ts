import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { times } from 'lodash'

import { Port, PortCall } from './../types/api'
import { MockedVessels, VesselId } from './vessels'

faker.seed(1)

const generatePort = (): Port => {
  return {
    id: faker.random.alpha(5),
    name: faker.address.city(),
  }
}

const ports = times(5, generatePort)

const generatePortCall = (): PortCall => {
  const arrival = dayjs(faker.date.past(1))
  const departure = arrival.add(faker.datatype.number(100), 'hours')

  return {
    arrival: arrival.toISOString(),
    departure: departure.toISOString(),
    createdDate: arrival.toISOString(),
    isOmitted: faker.datatype.boolean(),
    port: faker.helpers.arrayElement(ports),
  }
}

export const Vessel1Schedule = {
  vessel: MockedVessels[0],
  portCalls: times(7, generatePortCall),
}

export const Vessel2Schedule = {
  vessel: MockedVessels[0],
  portCalls: times(10, generatePortCall),
}

export const MockedSchedules = {
  [VesselId.ID_1]: Vessel1Schedule,
  [VesselId.ID_2]: Vessel2Schedule,
}
