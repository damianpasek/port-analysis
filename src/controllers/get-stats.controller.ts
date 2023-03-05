import { Request, Response } from 'express'

import { getAllPortCallsData } from '../services/get-all-port-calls-data'
import { getPortCallStats } from '../services/get-port-call-stats'
import {
  getPortsWithFewerPortCalls,
  getPortsWithMostPortCalls,
} from '../utils/get-most-port-calls'

export const getStatsController = async (_: Request, res: Response) => {
  const portCalls = await getAllPortCallsData()

  const stats = getPortCallStats(portCalls)

  const fewer = getPortsWithFewerPortCalls(stats)
  const most = getPortsWithMostPortCalls(stats)

  res.json({ fewer, most, percentiles: stats })
}
