import axios from 'axios'
import format from 'date-format'
import dateRange from '../../utils/dateRange'
import { Request, Response } from 'express'

class Stocks {
  async getStocks (req: { params: { stockName: string; }; }, res) {
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
      console.log(e)
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
    // console.log(from)
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName.toUpperCase()}&outputsize=full&apikey=DZHDQL5B9FQDEXC3`

    const options = {
      method: 'GET',
      url
    }

    const stocks = await axios.request(options)
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

    // const datesForEach = dates.map(date => {
    //   if (stocks.data['Time Series (Daily)'][date]) {
    //     return {
    //       opening: stocks.data['Time Series (Daily)'][date]['1. open'],
    //       low: stocks.data['Time Series (Daily)'][date]['3. low'],
    //       high: stocks.data['Time Series (Daily)'][date]['2. high'],
    //       closing: stocks.data['Time Series (Daily)'][date]['4. close'],
    //       pricedAt: format(format.ISO8601_WITH_TZ_OFFSET_FORMAT, new Date(date))
    //     }
    //   }
    //   return null
    // }).filter(date => date !== null)

    console.log(datesForEach)

    return res.status(200).json({
      name: stockSymbol,
      price: datesForEach
    })
  }
}

export default new Stocks()
