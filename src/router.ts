import { Router } from 'express'
import StocksControllers from './api/controllers/StocksControllers'
const router = Router()

router.get('/stocks/:stockName/quote', StocksControllers.getStocks)
router.get('/stocks/:stockName/history', StocksControllers.getStocksHistory)

export default router
