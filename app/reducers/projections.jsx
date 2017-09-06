import axios from 'axios'

const initialState = {
  cashflow: [],
  joint: false,
  user_birthday: new Date,
  spouse_birthday: new Date
}

const projections = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  default:
    return state
  }
}

export default projections
