import { PortCallStats } from '../services/get-port-call-stats'
import {
  getPortsWithFewerPortCalls,
  getPortsWithMostPortCalls,
} from './get-most-port-calls'

export const displayData = (stats: PortCallStats[]): void => {
  const fewerPortCalls = getPortsWithFewerPortCalls(stats)
  const mostPortCalls = getPortsWithMostPortCalls(stats)

  console.log('Ports with most port calls: \n-----')
  displayNumberOfPortCalls(mostPortCalls.reverse())

  console.log()

  console.log('Ports with fewer port calls: \n-----')
  displayNumberOfPortCalls(fewerPortCalls)

  console.log()

  console.log(
    'Ports call duration percentiles for each port in minutes: \n-----',
  )
  displayPercentiles(stats)
}

const displayNumberOfPortCalls = (ports: PortCallStats[]) =>
  ports.map((port) =>
    console.log(
      `${port.name} (ID: ${port.id}) - ${port.numberOfPortCalls} port call(s)`,
    ),
  )

const displayPercentiles = (ports: PortCallStats[]) =>
  ports.map((port) =>
    console.log(
      `${port.name} (ID: ${port.id}) - ${JSON.stringify(port.percentiles)}`,
    ),
  )
