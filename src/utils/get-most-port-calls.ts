import { PortCallStats } from './../services/get-port-call-stats'

export const getPortsWithFewerPortCalls = (
  ports: PortCallStats[],
  number = 5,
): PortCallStats[] => ports.slice(0, number)

export const getPortsWithMostPortCalls = (
  ports: PortCallStats[],
  number = 5,
): PortCallStats[] => ports.slice(-number)
