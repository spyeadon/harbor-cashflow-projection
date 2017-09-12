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

const formatSpouseCashflow = (data, userAge, spouseAge) => {

}

const formatIndividualCashflow = data =>
  data.map(yearObj => ({
    year: yearObj.end_date.split('-')[0],
    user_work: formatNumberStr(yearObj.sources.user_work),
    user_social_security: formatNumberStr(yearObj.sources.user_social_security),
    asset_income: formatNumberStr(yearObj.sources.asset_income),
    total: formatNumberStr(yearObj.total)
  }))

export const generateRows = (data, joint, userAge, spouseAge = null) => {
  const cashflow = isJointAccount(data, joint)
  if (joint) return formatSpouseCashflow(cashflow, userAge, spouseAge)
  else return formatIndividualCashflow(cashflow)
}
