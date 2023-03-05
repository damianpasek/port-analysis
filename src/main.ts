import { getAllPortCallsData } from './services/get-all-port-calls-data'
import { getPortCallStats } from './services/get-port-call-stats'
import { displayData } from './utils/display-data'

export const main = async () => {
  const portCalls = await getAllPortCallsData()

  const stats = getPortCallStats(portCalls)

  displayData(stats)
}
