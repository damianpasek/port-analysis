import { Router } from 'express'

import { getStatsController } from './../controllers/get-stats.controller'

const routes = (app: Router) => {
  app.get('/stats', getStatsController)
}

export default routes
