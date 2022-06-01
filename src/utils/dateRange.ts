import format from 'date-format'

function dateRange (startDate, endDate, steps = 1) {
  console.log(startDate, endDate)
  const dateArray = []
  const currentDate = new Date(startDate)

  while (currentDate <= new Date(endDate)) {
    dateArray.push(format('yyyy-MM-dd', currentDate))

    currentDate.setUTCDate(currentDate.getUTCDate() + steps)
  }

  return dateArray
}

export default dateRange
