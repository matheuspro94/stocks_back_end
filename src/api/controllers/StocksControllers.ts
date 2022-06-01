import axios from 'axios'
import format from 'date-format'
import dateRange from '../../utils/dateRange'
import { Request, Response } from 'express'

class Stocks {
  async getStocks (req: Request, res: Response) {
    const stockName = req.params.stockName

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockName.toUpperCase()}&apikey=DZHDQL5B9FQDEXC3`

    const stocks = []

    const options = {
      method: 'GET',
      url
    }

    await axios.request(options).then((response) => {
      console.log(response.data)
      stocks.push(response.data)
    }).catch((e) => {
      return res.status(400).json({
        error: 'Stock not found'
      })
    })

    const newStocks = stocks
      .map(stock => Object.values(stock)
        .map(value => Object.values(value)))

    const newStocks2 = {
      name: newStocks[0][0][0],
      lastprice: Number(newStocks[0][0][4]).toFixed(2),
      priceAt: format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date(newStocks[0][0][6]))
    }

    return res.status(200).json(newStocks2)
  }

  async getStocksHistory (req: Request, res: Response) {
    const { from, to } = req.query
    const stockName = req.params.stockName

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName.toUpperCase()}&outputsize=full&apikey=DZHDQL5B9FQDEXC3`

    const options = {
      method: 'GET',
      url
    }

    const stocks = await axios.request(options)

    if (!stocks) {
      return res.status(400).json({
        error: 'Stock not found'
      })
    }

    const stockSymbol = stocks.data['Meta Data']['2. Symbol']

    const dates = dateRange(from, to)

    const datesForEach = dates.reduce((acc, date) => {
      if (stocks.data['Time Series (Daily)'][date]) {
        acc.push(
          {
            opening: Number(stocks.data['Time Series (Daily)'][date]['1. open']).toFixed(2),
            low: Number(stocks.data['Time Series (Daily)'][date]['3. low']).toFixed(2),
            high: Number(stocks.data['Time Series (Daily)'][date]['2. high']).toFixed(2),
            closing: Number(stocks.data['Time Series (Daily)'][date]['4. close']).toFixed(2),
            pricedAt: format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date(date))
          }
        )
      }
      return acc
    }, [])

    return res.status(200).json({
      name: stockSymbol,
      price: datesForEach
    })
  }

  async getCompareStocks (req: Request, res: Response) {
    const { stocks } = req.body
    const stockName = req.params.stockName

    const getStocks = await Promise.all(stocks.map(async (stock: string) => {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.toUpperCase()}&apikey=DZHDQL5B9FQDEXC3`

      const options = {
        method: 'GET',
        url
      }

      const response = await axios.request(options)

      return {
        name: response.data['Global Quote']['01. symbol'],
        lastprice: Number(response.data['Global Quote']['05. price']).toFixed(2),
        priceAt: format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date(response.data['Global Quote']['07. latest trading day']))
      }
    }))

    if (!getStocks) {
      return res.status(400).json({
        error: 'Stock not found'
      })
    }

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockName.toUpperCase()}&apikey=DZHDQL5B9FQDEXC3`

    const stock = []

    const options = {
      method: 'GET',
      url
    }

    const { data } = await axios.request(options)

    if (!data) {
      return res.status(400).json({
        error: 'Stock not found'
      })
    }

    stock.push(data)

    const newStocks = {
      name: stock[0]['Global Quote']['01. symbol'],
      lastprice: Number(stock[0]['Global Quote']['05. price']).toFixed(2),
      priceAt: format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date(stock[0]['Global Quote']['07. latest trading day']))
    }

    res.status(200).json({
      lastprice: [
        newStocks,
        getStocks
      ]
    })
  }

  async getGains (req: Request, res: Response) {
    const stockName = req.params.stockName
    const { purchasedAmount, purchasedAt } = req.query

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName.toUpperCase()}&outputsize=full&apikey=DZHDQL5B9FQDEXC3`

    const options = {
      method: 'GET',
      url
    }

    const stocks = await axios.request(options)

    if (!stocks) {
      return res.status(400).json({
        error: 'Stock not found'
      })
    }

    const stockTime = stocks.data['Time Series (Daily)'][`${purchasedAt}`]

    const stockSymbol = stocks.data['Meta Data']['2. Symbol']

    res.status(200).json({
      name: stockSymbol,
      purchasedAmount,
      purchasedAt: format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date(`${purchasedAt}`)),
      priceAtDate: Number(stocks.data['Time Series (Daily)'][`${purchasedAt}`]['1. open']),
      lastPrice: Number(stockTime['4. close']).toFixed(2),
      capitalGain: Number((Number(stockTime['4. close']) - Number(purchasedAmount)).toFixed(2))
    })
  }
}

export default new Stocks()
