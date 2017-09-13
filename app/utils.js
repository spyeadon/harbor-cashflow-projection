export const calculateAge = (birthday) => {
  const formattedBirthday = new Date(birthday)
  const ageDifMs = Date.now() - formattedBirthday.getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

const individualTaxBrackets = () =>
  [
    {rate: 0.010, ceil: 9325, floor: 0, flatTax: 0},
    {rate: 0.015, ceil: 37950, floor: 9325, flatTax: 932.5},
    {rate: 0.025, ceil: 91900, floor: 37950, flatTax: 5226.25},
    {rate: 0.028, ceil: 191650, floor: 91900, flatTax: 18713.75},
    {rate: 0.033, ceil: 416700, floor: 191650, flatTax: 46643.75},
    {rate: 0.035, ceil: 418400, floor: 416700, flatTax: 120910.25},
    {rate: 0.0396, ceil: Infinity, floor: 418400, flatTax: 121505.25}
  ]

const jointTaxBrackets = () =>
  [
    {rate: 0.010, ceil: 18650, floor: 0, flatTax: 0},
    {rate: 0.015, ceil: 75900, floor: 18650, flatTax: 1865},
    {rate: 0.025, ceil: 153100, floor: 75900, flatTax: 10452.5},
    {rate: 0.028, ceil: 233350, floor: 153100, flatTax: 29752.5},
    {rate: 0.033, ceil: 416700, floor: 233350, flatTax: 52222.5},
    {rate: 0.035, ceil: 470700, floor: 416700, flatTax: 112728},
    {rate: 0.0396, ceil: Infinity, floor: 470700, flatTax: 131628}
  ]

const updateTaxBrackets = taxBrackets =>
  taxBrackets.map(bracket => ({
    rate: bracket.rate,
    ceil: bracket.ceil += (bracket.ceil * 0.02),
    floor: bracket.floor += (bracket.floor * 0.02),
    flatTax: bracket.flatTax += (bracket.flatTax * 0.02)
  }))

const calculateTaxes = joint => {
  let taxBrackets
  if (joint) taxBrackets = jointTaxBrackets()
  else taxBrackets = individualTaxBrackets()
  return (preTaxIncome) => {
    let taxes
    taxBrackets.forEach(bracket => {
      if (preTaxIncome > bracket.floor && preTaxIncome <= bracket.ceil) {
        const percentTax = (preTaxIncome - bracket.floor) * bracket.rate
        taxes = bracket.flatTax + percentTax
      }
    })
    taxBrackets = updateTaxBrackets(taxBrackets)
    return taxes
  }
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

const formatSpouseCashflow = (data, userAge, spouseAge) => {
  const yearlyTaxCalculation = calculateTaxes(true)
  return data.sort(sortByYear).map(yearObj => {
    const taxes = yearlyTaxCalculation(yearObj.total)
    const formattedData = {
      year: yearObj.end_date.split('-')[0],
      work: formatNumberStr(yearObj.sources.user_work + yearObj.sources.spouse_work),
      social_security: formatNumberStr(yearObj.sources.user_social_security + yearObj.sources.spouse_social_security),
      asset_income: formatNumberStr(yearObj.sources.asset_income),
      total: formatNumberStr(yearObj.total),
      taxes: '-' + formatNumberStr(taxes),
      taxed_income: formatNumberStr(yearObj.total - taxes),
      detailRows: [{
        age: userAge,
        income: formatNumberStr(yearObj.sources.user_work),
        social_security: formatNumberStr(yearObj.sources.user_social_security),
        spouse_age: spouseAge,
        spouse_income: formatNumberStr(yearObj.sources.spouse_work),
        spouse_social_security: formatNumberStr(yearObj.sources.spouse_social_security)
      }],
      detailColumns: [
        {name: 'age', title: 'Your Age'},
        {name: 'income', title: 'Your Income'},
        {name: 'social_security', title: 'Your Social Security'},
        {name: 'spouse_age', title: "Your Spouse's Age"},
        {name: 'spouse_income', title: "Spouse's Income"},
        {name: 'spouse_social_security', title: "Spouse's Social Security"}
      ]
    }
    userAge++
    spouseAge++
    return formattedData
  })
}

const formatIndividualCashflow = (data, userAge) => {
  const yearlyTaxCalculation = calculateTaxes(false)
  return data.sort(sortByYear).map(yearObj => {
    const taxes = yearlyTaxCalculation(yearObj.total)
    const formattedData = {
      year: yearObj.end_date.split('-')[0],
      work: formatNumberStr(yearObj.sources.user_work),
      social_security: formatNumberStr(yearObj.sources.user_social_security),
      asset_income: formatNumberStr(yearObj.sources.asset_income),
      total: formatNumberStr(yearObj.total),
      taxes: '-' + formatNumberStr(taxes),
      taxed_income: formatNumberStr(yearObj.total - taxes),
      detailRows: [{age: userAge}],
      detailColumns: [{name: 'age', title: 'Your Age'}]
    }
    userAge++
    return formattedData
  })
}

export const generateRows = (data, joint, userAge, spouseAge = null) => {
  const cashflow = isJointAccount(data, joint)
  if (joint) return formatSpouseCashflow(cashflow, userAge, spouseAge)
  else return formatIndividualCashflow(cashflow, userAge)
}
