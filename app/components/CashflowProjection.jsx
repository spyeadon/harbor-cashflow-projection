import React from 'react'
import {connect} from 'react-redux'
import {viewCashflow} from '../reducers/projections.jsx'
import {
  Grid, TableView, TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui'

class CashProjComponent extends React.Component {
  constructor({cashflow, joint, user_birthday, spouse_birthday, showProjections}) {
    super()
    this.renderProjections = this.renderProjections.bind(this)
  }

  renderProjections(evt) {
    evt.preventDefault()
    this.props.showProjections(evt.target.userBirthday.value, evt.target.spouseBirthday.value)
  }

  render() {
    return (
    <div>
      <h3>
        Please enter your birthday, and your spouse's birthday (if applicable) in the form below!
      </h3>
      <span>Use the format: 09/03/1990</span>
      <form
      id="birthday-form"
      onSubmit={this.renderProjections} >
        <input
          name="userBirthday"
          placeholder='Your Birthday'
        />
        <input
          name="spouseBirthday"
          placeholder='Spouse Birthday'
        />
        <input type="submit" value="View Cashflow Projection" />
      </form>
      <div>
        <Grid
          rows={[
            { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
            { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
          ]}
          columns={[
            { name: 'id', title: 'ID' },
            { name: 'product', title: 'Product' },
            { name: 'owner', title: 'Owner' },
          ]}>
          <TableView />
          <TableHeaderRow />
        </Grid>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  cashflow: state.projections.cashflow,
  joint: state.projections.joint,
  user_birthday: state.projections.user_birthday,
  spouse_birthday: state.projections.spouse_birthday
})

const mapDispatchToProps = dispatch => ({
  showProjections(userBirthday, spouseBirthday) {
    dispatch(viewCashflow(userBirthday, spouseBirthday))
  }
})

const CashflowProjection = connect(mapStateToProps, mapDispatchToProps)(CashProjComponent)

export default CashflowProjection
