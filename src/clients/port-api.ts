import axios from 'axios'

import { Schedule, Vessel } from '../types/api'

const client = axios.create({
  baseURL: 'https://import-coding-challenge-api.portchain.com/api/v2',
})

export const fetchVessels = async (): Promise<Vessel[]> => {
  const { data } = await client.get<Vessel[]>('/vessels')

  return data
}

export const fetchScheduleData = async (imo: number): Promise<Schedule> => {
  const { data } = await client.get<Schedule>(`/schedule/${imo}`)
  return data
}
