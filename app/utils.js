export const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - birthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const isJointAccount = (data, joint) => {
  if (joint) return data.spouse
  else return data.individual
}

const formatNumberStr = num =>
  '$' + Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const generateAgeRow = (data, userAge, spouseAge = NaN) => {
  if (isNaN(spouseAge)) {
    return data.reduce((ageRow, yearObj) => {
      ageRow[yearObj.end_date.split('-')[0]] = userAge
      userAge++
      return ageRow
    }, {})
  } else {
    // add a row for user age
    // also add a row for spouse age
  }
}

export const defaultDataPoints = joint => {
  if (joint) return ['user_work', 'user_social_security', 'asset_income', 'total']
  else return ['user_work', 'user_social_security', 'asset_income', 'total']
}

const formatSpouseCashflow = (data, userAge, spouseAge) => {
  const rowHeaders = defaultDataPoints(true)
}

const formatIndividualCashflow = (data, userAge) => {
  const row = [generateAgeRow(data, userAge)]
  return row.concat(defaultDataPoints(false).map(dataPoint =>
    data.reduce((row, yearObj) => {
      const currentYear = yearObj.end_date.split('-')[0]
      if (yearObj[dataPoint]) row[currentYear] = formatNumberStr(yearObj[dataPoint])
      else row[currentYear] = formatNumberStr(yearObj.sources[dataPoint])
      return row
    }, {})
  ))
}

export const generateRows = (data, joint, userAge, spouseAge = null) => {
  const cashflow = isJointAccount(data, joint)
  if (joint) return formatSpouseCashflow(cashflow, userAge, spouseAge)
  else return formatIndividualCashflow(cashflow, userAge)
}

export const generateColumns = (data, joint) =>
  isJointAccount(data, joint).map(year => {
    const currentYear = year.end_date.split('-')[0]
    return {name: currentYear, title: currentYear}
  })
