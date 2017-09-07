import axios from 'axios'

const TOGGLE_SPOUSE = 'TOGGLE_SPOUSE'
export const toggleSpouse = spouse => ({
  type: TOGGLE_SPOUSE,
  spouse
})

const CASHFLOW = 'CASHFLOW'
const cashflow = cashflow => ({
  type: CASHFLOW,
  cashflow
})
export const getCashflow = () =>
  dispatch =>
    axios.get('/api/income/individual')
    .then(res => dispatch(cashflow(res.data)))
    .catch(err => console.error(err))

const CASHFLOW_SPOUSE = 'CASHFLOW_SPOUSE'
const cashflowSpouse = cashflowSpouse => ({
  type: CASHFLOW_SPOUSE,
  cashflowSpouse
})
export const getCashflowSpouse = () =>
dispatch =>
  axios.get('/api/income/spouse')
  .then(res => dispatch(cashflowSpouse(res.data)))
  .catch(err => console.error(err))

const initialState = {
  cashflow: {
    spouse: [],
    individual: []
  },
  joint: false,
  user_birthday: new Date,
  spouse_birthday: new Date
}

const projections = (state = initialState, action) => {
  const newState = Object.assign({}, state)
  const cashflow = Object.assign({}, newState.cashflow)

  switch (action.type) {
  case (CASHFLOW):
    cashflow.individual = action.cashflow
    newState.cashflow = cashflow
    return newState

  case (CASHFLOW_SPOUSE):
    cashflow.spouse = action.cashflowSpouse
    newState.cashflow = cashflow
    return newState

  default:
    return state
  }
}

export default projections
