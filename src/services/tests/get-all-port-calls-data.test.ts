import { MockedSchedules } from '../../__mocks__/schedules'
import { MockedVessels, VesselId } from '../../__mocks__/vessels'
import * as api from '../../clients/port-api'
import { getAllPortCallsData } from '../get-all-port-calls-data'

describe('Services: getAllPortCallsData', () => {
  beforeEach(() => {
    jest.spyOn(api, 'fetchVessels').mockResolvedValue(MockedVessels)
    jest
      .spyOn(api, 'fetchScheduleData')
      .mockImplementation(async (id: VesselId) => MockedSchedules[id])
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call API to fetch all port calls data', async () => {
    const result = await getAllPortCallsData()

    expect(result.length).toEqual(11)
    expect(result.flat()).toEqual(result)

    expect(api.fetchVessels).toHaveBeenCalledTimes(1)
    expect(api.fetchScheduleData).toHaveBeenCalledTimes(MockedVessels.length)

    expect(api.fetchScheduleData).toHaveBeenNthCalledWith(
      1,
      MockedVessels[0].imo,
    )
    expect(api.fetchScheduleData).toHaveBeenNthCalledWith(
      2,
      MockedVessels[1].imo,
    )
  })

  it('should return an array of port calls excluding omitted ones', async () => {
    const result = await getAllPortCallsData()

    result.forEach((item) => {
      expect(item.isOmitted).toBe(false)
    })
  })

  it('should return an empty array if vessels enpoint returns empty array', async () => {
    jest.spyOn(api, 'fetchVessels').mockResolvedValue([])

    const result = await getAllPortCallsData()

    expect(result).toEqual([])
  })

  it('should return an empty array if schedule endpoint returns empty array', async () => {
    jest
      .spyOn(api, 'fetchScheduleData')
      .mockResolvedValue({ portCalls: [], vessel: MockedVessels[0] })

    const result = await getAllPortCallsData()

    expect(result).toEqual([])
  })
})
