import React from 'react'
import {connect} from 'react-redux'

class CashProjComponent extends React.Component {
  constructor({cashflow, joint, user_birthday, spouse_birthday}) {
    super()
  }

  render() {
    return (
    <div>
      Sample for rendering
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cashflow: null,
  joint: null,
  user_birthday: null,
  spouse_birthday: null
})

const CashflowProjection = connect(mapStateToProps, null)(CashProjComponent)

export default CashflowProjection
