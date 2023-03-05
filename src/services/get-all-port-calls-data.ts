import { fetchScheduleData, fetchVessels } from '../clients/port-api'
import { PortCall } from '../types/api'

export const getAllPortCallsData = async (): Promise<PortCall[]> => {
  const vessels = await fetchVessels()

  const schedules = await Promise.all(
    vessels.map((vessel) => {
      return fetchScheduleData(vessel.imo)
    }),
  )

  return schedules
    .map(({ portCalls }) => portCalls)
    .flat()
    .filter(({ isOmitted }) => !isOmitted)
}
