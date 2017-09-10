import React from 'react'
import {connect} from 'react-redux'
import {generateRows, generateColumns, calculateAge} from '../utils.js'
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
    const userAge = evt.target.userBirthday.value
    const spouseAge = evt.target.spouseBirthday.value
    if (isNaN(calculateAge(new Date(userAge)))) {
      window.alert('Please use the format: MM/DD/YYYY')
    } else {
      this.props.showProjections(userAge, spouseAge)
      if (this.props.cashflow) {
        this.setState({columns: generateColumns(
          this.props.cashflow,
          this.props.joint
        )})
        this.setState({rows: generateRows(
          this.props.cashflow,
          this.props.joint,
          calculateAge(new Date(userAge)),
          calculateAge(new Date(spouseAge))
        )})
      }
    }
  }

  render() {
    const {rows, columns} = this.state
    console.log('columns are: ', columns)
    console.log('rows are: ', rows)

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
      <div style={{width: '15%', margin: '0', display: 'inline-block'}}>
        <Grid
          rows={[{dataPoint: 'Age'},
            {dataPoint: 'Income from Work'},
            {dataPoint: 'Social Security'},
            {dataPoint: 'Asset Income'},
            {dataPoint: 'Total'}
          ]}
          columns={[{name: 'dataPoint', title: 'Year'}]}>
          <PagingState />
          <LocalPaging />
          <TableView />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
      </div>
      <div style={{width: '40%', margin: '0', display: 'inline-block'}}>
        <Grid
          rows={rows}
          columns={columns}>
          <PagingState pageSize={5} defaultPageSize={5} />
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
