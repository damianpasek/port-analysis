export type Vessel = {
  imo: number
  name: string
}

export type Port = {
  id: string
  name: string
}

export type PortCall = {
  arrival: string
  departure: string
  createdDate: string
  isOmitted: boolean
  port: Port
}

export type Schedule = {
  vessel: Vessel
  portCalls: PortCall[]
}
