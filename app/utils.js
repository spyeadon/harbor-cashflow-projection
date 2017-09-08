const isJointAccount = (data, joint) => {
  if (joint) return data.spouse
  else return data.individual
}

export const generateRows = (data, joint) => {
  const cashflow = isJointAccount(data, joint)
}

export const generateColumns = (data, joint) => {
  let currentYear
  const cashflow = isJointAccount(data, joint)
  const columns = [{name: 'year', title: 'Year'}]
  return columns.concat(
    cashflow.map(year => {
      currentYear = year.end_date.split('-')[0]
      return {name: currentYear, title: currentYear}
    })
  )
}
