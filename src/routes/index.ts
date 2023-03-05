import { Router } from 'express'

import statsRoutes from './stats'

const setup = (app: Router) => {
  statsRoutes(app)
}

export default setup
