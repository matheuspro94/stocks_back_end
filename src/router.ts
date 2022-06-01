import { Router } from 'express'
import StocksControllers from './api/controllers/StocksControllers'
const router = Router()

router.get('/stocks/:stockName/quote', StocksControllers.getStocks)
router.get('/stocks/:stockName/history', StocksControllers.getStocksHistory)
router.get('/stocks/:stockName/compare', StocksControllers.getCompareStocks)
router.get('/stocks/:stockName/gains', StocksControllers.getGains)

export default router
