import React from 'react'
import {connect} from 'react-redux'
import {generateRows, generateColumns} from '../utils.js'
import {viewCashflow} from '../reducers/projections.jsx'
import {
  PagingState, LocalPaging
} from '@devexpress/dx-react-grid'
import {
  Grid, TableView, TableHeaderRow, PagingPanel
} from '@devexpress/dx-react-grid-material-ui'

class CashProjComponent extends React.Component {
  constructor(props) {
    super()
    this.state = {
      rows: [],
      columns: []
    }
    this.renderProjections = this.renderProjections.bind(this)
  }

  renderProjections(evt) {
    evt.preventDefault()
    this.props.showProjections(evt.target.userBirthday.value, evt.target.spouseBirthday.value)
    if (this.props.cashflow) {
      this.setState({columns: generateColumns(this.props.cashflow, this.props.joint)})
    }
  }

  render() {
    const {rows, columns} = this.state
    console.log('columns are: ', columns)

    return (
    <div>
      <h3>
        Please enter your birthday, and your spouse's birthday (<i>if applicable</i>) in the form below!
      </h3>
      <span>Use the format: mm/dd/yyyy</span>
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
          rows={rows}
          columns={columns}
        >
          <PagingState pageSize={5} />
          <LocalPaging />
          <TableView />
          <TableHeaderRow />
          <PagingPanel />
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
