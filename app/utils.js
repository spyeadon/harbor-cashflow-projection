export const calculateAge = (birthday) => {
  const formattedBirthday = new Date(birthday)
  const ageDifMs = Date.now() - formattedBirthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const isJointAccount = (data, joint) => {
  if (joint) return data.spouse
  else return data.individual
}

const formatNumberStr = num =>
  '$' + Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const dateStrToNum = yearObj =>
  Number(yearObj.end_date.split('-')[0])

const sortByYear = (firstYear, secondYear) => {
  if (dateStrToNum(firstYear) < dateStrToNum(secondYear)) return -1
  if (dateStrToNum(firstYear) > dateStrToNum(secondYear)) return 1
  return 0
}

const formatSpouseCashflow = (data, userAge, spouseAge) =>
  data.sort(sortByYear).map(yearObj => {
    const formattedData = {
      year: yearObj.end_date.split('-')[0],
      work: formatNumberStr(yearObj.sources.user_work + yearObj.sources.spouse_work),
      social_security: formatNumberStr(yearObj.sources.user_social_security + yearObj.sources.spouse_social_security),
      asset_income: formatNumberStr(yearObj.sources.asset_income),
      total: formatNumberStr(yearObj.total),
      detailRows: [{
        age: userAge,
        spouse_age: spouseAge,
        income: formatNumberStr(yearObj.sources.user_work),
        spouse_income: formatNumberStr(yearObj.sources.spouse_work),
        social_security: formatNumberStr(yearObj.sources.user_social_security),
        spouse_social_security: formatNumberStr(yearObj.sources.spouse_social_security)
      }],
      detailColumns: [
        {name: 'age', title: 'Your Age'},
        {name: 'spouse_age', title: "Your Spouse's Age"},
        {name: 'income', title: 'Your Income'},
        {name: 'spouse_income', title: "Spouse's Income"},
        {name: 'social_security', title: 'Your Social Security'},
        {name: 'spouse_social_security', title: "Spouse's Social Security"}
      ]
    }
    userAge++
    spouseAge++
    return formattedData
  })

const formatIndividualCashflow = (data, userAge) =>
  data.sort(sortByYear).map(yearObj => {
    const formattedData = {
      year: yearObj.end_date.split('-')[0],
      work: formatNumberStr(yearObj.sources.user_work),
      social_security: formatNumberStr(yearObj.sources.user_social_security),
      asset_income: formatNumberStr(yearObj.sources.asset_income),
      total: formatNumberStr(yearObj.total),
      detailRows: [{age: userAge}],
      detailColumns: [{name: 'age', title: 'Your Age'}]
    }
    userAge++
    return formattedData
  })

export const generateRows = (data, joint, userAge, spouseAge = null) => {
  const cashflow = isJointAccount(data, joint)
  if (joint) return formatSpouseCashflow(cashflow, userAge, spouseAge)
  else return formatIndividualCashflow(cashflow, userAge)
}
