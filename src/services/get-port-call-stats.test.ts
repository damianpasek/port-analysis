import { Vessel2Schedule } from '../__mocks__/schedules'
import * as percentileUtils from '../utils/get-port-call-duration-percentiles'
import { getPortCallStats } from './get-port-call-stats'

describe('Services: getPortCallStats', () => {
  const percentiles = {}

  beforeEach(() => {
    jest
      .spyOn(percentileUtils, 'getPortCallsDurationPercentiles')
      .mockReturnValue(percentiles)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return stats data for each of ports', () => {
    const result = getPortCallStats(Vessel2Schedule.portCalls)

    expect(result.length).toBe(4)
    expect(result).toEqual([
      {
        id: 'loldy',
        name: 'Port Presleycester',
        numberOfPortCalls: 1,
        percentiles,
      },
      {
        id: 'lwfan',
        name: 'Volkmanview',
        numberOfPortCalls: 2,
        percentiles,
      },
      {
        id: 'yowki',
        name: 'Lefflerberg',
        numberOfPortCalls: 2,
        percentiles,
      },
      {
        id: 'kzsya',
        name: 'West Zolaville',
        numberOfPortCalls: 5,
        percentiles,
      },
    ])

    expect(
      percentileUtils.getPortCallsDurationPercentiles,
    ).toHaveBeenCalledTimes(4)
  })

  it('should return empty array when called with empty array', () => {
    const result = getPortCallStats([])

    expect(result).toEqual([])
  })
})
