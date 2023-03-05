import { take, takeRight, times } from 'lodash'
import request from 'supertest'

import { Vessel1Schedule } from '../../__mocks__/schedules'
import app from '../../app'
import * as getDataServices from '../../services/get-all-port-calls-data'
import * as getStatsServices from '../../services/get-port-call-stats'

describe('Routes: Stats', () => {
  describe('GetStatsController', () => {
    const portCalls = Vessel1Schedule.portCalls

    const stats = times(15, (n) => ({
      id: `id-${n}`,
      name: `name-${n}`,
      numberOfPortCalls: n,
      percentiles: {},
    }))

    beforeEach(() => {
      jest
        .spyOn(getDataServices, 'getAllPortCallsData')
        .mockResolvedValue(portCalls)
      jest.spyOn(getStatsServices, 'getPortCallStats').mockReturnValue(stats)
    })

    it('should fetch the data and return stats', async () => {
      const { status, body } = await request(app).get('/stats')

      expect(status).toBe(200)

      expect(body.fewer).toEqual(take(stats, 5))
      expect(body.most).toEqual(takeRight(stats, 5))
      expect(body.percentiles).toEqual(stats)

      expect(getDataServices.getAllPortCallsData).toHaveBeenCalledTimes(1)

      expect(getStatsServices.getPortCallStats).toHaveBeenCalledTimes(1)
      expect(getStatsServices.getPortCallStats).toHaveBeenCalledWith(portCalls)
    })

    it('should return status 500 in case of unexpected error', async () => {
      jest
        .spyOn(getDataServices, 'getAllPortCallsData')
        .mockRejectedValue('UnexpectedError')

      const { status } = await request(app).get('/stats')

      expect(status).toBe(500)
    })
  })
})
