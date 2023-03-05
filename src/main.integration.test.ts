import { Vessel1Schedule } from './__mocks__/schedules'
import { main } from './main'
import * as getAllPortCallsDataServices from './services/get-all-port-calls-data'
import { PortCallStats } from './services/get-port-call-stats'
import * as getPortCallStatsServices from './services/get-port-call-stats'
import * as displayDataUtils from './utils/display-data'

describe('Main', () => {
  const portCalls = Vessel1Schedule.portCalls
  const stats = [] as PortCallStats[]

  beforeEach(() => {
    jest
      .spyOn(getAllPortCallsDataServices, 'getAllPortCallsData')
      .mockResolvedValue(portCalls)
    jest
      .spyOn(getPortCallStatsServices, 'getPortCallStats')
      .mockReturnValue(stats)
    jest.spyOn(displayDataUtils, 'displayData').mockReturnValue()
  })

  it('should invoke given methods with proper data', async () => {
    await main()

    expect(
      getAllPortCallsDataServices.getAllPortCallsData,
    ).toHaveBeenCalledTimes(1)

    expect(getPortCallStatsServices.getPortCallStats).toHaveBeenCalledWith(
      portCalls,
    )

    expect(displayDataUtils.displayData).toHaveBeenCalledWith(stats)
  })

  it('should throw an error if any occurred', async () => {
    jest
      .spyOn(getAllPortCallsDataServices, 'getAllPortCallsData')
      .mockRejectedValue('FetchError')

    await expect(main()).rejects.toEqual('FetchError')
  })
})
