import { chain } from 'lodash'

import { PortCall } from '../types/api'
import {
  getPortCallsDurationPercentiles,
  Percentiles,
} from '../utils/get-port-call-duration-percentiles'

export type PortCallStats = {
  id: string
  name: string
  numberOfPortCalls: number
  percentiles: Percentiles
}

export const getPortCallStats = (portCalls: PortCall[]): PortCallStats[] => {
  return chain(portCalls)
    .groupBy((portCall) => portCall.port.id)
    .toPairs()
    .map(([id, portCalls]) => ({
      id,
      name: portCalls[0].port.name,
      numberOfPortCalls: portCalls.length,
      percentiles: getPortCallsDurationPercentiles(portCalls),
    }))
    .sortBy(({ numberOfPortCalls }) => numberOfPortCalls)
    .value()
}
