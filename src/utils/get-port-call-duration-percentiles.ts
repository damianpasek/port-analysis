import dayjs from 'dayjs'
import { chain } from 'lodash'
import percentile from 'percentile'

import { PERCENTILE_DURATION_UNIT, PERCENTILES } from '../constants/percentiles'
import { PortCall } from '../types/api'

const getDurations = (portCalls: PortCall[]) => {
  return portCalls.map((portCall) => {
    const arrival = new Date(portCall.arrival)
    const departure = new Date(portCall.departure)

    return dayjs(departure).diff(arrival, PERCENTILE_DURATION_UNIT)
  })
}

export const getPortCallsDurationPercentiles = (
  portCalls: PortCall[],
): Record<string, number> => {
  const durations = getDurations(portCalls)

  return chain(percentile(PERCENTILES, durations) as number[])
    .map((value, index) => [PERCENTILES[index], value])
    .fromPairs()
    .value()
}
