import dayjs from 'dayjs'

import { PERCENTILE_DURATION_UNIT } from '../constants/percentiles'
import { PortCall } from './../types/api'
import { getPortCallsDurationPercentiles } from './get-port-call-duration-percentiles'

describe('Utils: getPortCallsDurationPercentiles', () => {
  const portCalls = [
    {
      arrival: dayjs('2022-12-01 19:18').toISOString(),
      departure: dayjs('2022-12-02 06:35').toISOString(),
    },
    {
      arrival: dayjs('2022-12-12 18:00').toISOString(),
      departure: dayjs('2022-12-14 06:00').toISOString(),
    },
    {
      arrival: dayjs('2022-12-24 07:00').toISOString(),
      departure: dayjs('2022-12-27 04:00').toISOString(),
    },
    {
      arrival: dayjs('2023-03-01 06:45').toISOString(),
      departure: dayjs('2023-03-03 12:35').toISOString(),
    },
  ] as PortCall[]

  it(`should return object with duration percentiles in ${PERCENTILE_DURATION_UNIT}`, () => {
    const percentiles = getPortCallsDurationPercentiles(portCalls as PortCall[])

    const getDuration = (portCall: PortCall) =>
      dayjs(portCall.departure).diff(portCall.arrival, PERCENTILE_DURATION_UNIT)

    expect(percentiles).toEqual({
      5: getDuration(portCalls[0]),
      20: getDuration(portCalls[0]),
      50: getDuration(portCalls[1]),
      75: getDuration(portCalls[3]),
      90: getDuration(portCalls[2]),
    })
  })

  it('should return empty object for empty array', () => {
    const percentiles = getPortCallsDurationPercentiles([])

    expect(percentiles).toEqual({})
  })
})
