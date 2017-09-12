import React from 'react'
import {connect} from 'react-redux'
import {generateRows, calculateAge} from '../utils.js'
import {viewCashflow} from '../reducers/projections.jsx'
import {
  PagingState, LocalPaging, RowDetailState
} from '@devexpress/dx-react-grid'
import {
  Grid, TableView, TableHeaderRow, PagingPanel, TableRowDetail
} from '@devexpress/dx-react-grid-material-ui'

class CashProjComponent extends React.Component {
  constructor(props) {
    super()
    this.state = {
      rows: [],
      columns: [
        { name: 'year', title: 'Year' },
        { name: 'work', title: 'Income from Work' },
        { name: 'social_security', title: 'Social Security' },
        { name: 'asset_income', title: 'Asset Income' },
        { name: 'total', title: 'Combined Income' },
      ]
    }
    this.renderProjections = this.renderProjections.bind(this)
    this.generateRowDetails = this.generateRowDetails.bind(this)
    this.checkDateFormat = this.checkDateFormat.bind(this)
  }

  checkDateFormat(age) {
    const ageArr = age.split('/')
    if (ageArr.length === 3 && ageArr[0].length === 2 && ageArr[1].length === 2 && ageArr[2].length === 4 && !isNaN(calculateAge(age))) {
      return true
    } else {
      window.alert('Please use the format: MM/DD/YYYY')
      return false
    }
  }

  renderProjections(evt) {
    evt.preventDefault()
    const userAge = evt.target.userBirthday.value
    const spouseAge = evt.target.spouseBirthday.value
    if (userAge.length && !spouseAge.length) {
      if (this.checkDateFormat(userAge) && this.props.cashflow) {
        this.props.updateBirthdays(userAge, spouseAge)
        this.setState({rows: generateRows(
          this.props.cashflow,
          false,
          calculateAge(userAge),
          calculateAge(spouseAge)
        )})
      }
    } else if (userAge.length && spouseAge.length) {
      if (this.checkDateFormat(userAge) && this.checkDateFormat(spouseAge) && this.props.cashflow) {
        this.props.updateBirthdays(userAge, spouseAge)
        this.setState({rows: generateRows(
          this.props.cashflow,
          true,
          calculateAge(userAge),
          calculateAge(spouseAge)
        )})
      }
    } else {
      window.alert("Enter your birthday, or both you and your spouse's birthday")
    }
  }

  generateRowDetails({row}) {
    return (
      <div className="individual-data-container">
        {row.detailColumns.map(dataPoint =>
          <p key={dataPoint.name} className="detail-row">
            <strong>{dataPoint.title}</strong>: {row.detailRows[0][dataPoint.name]}
          </p>
        )}
      </div>
    )
  }

  render() {
    const {rows, columns} = this.state
    console.log('rows are: ', rows)

    return (
      <div className="cashflow-container">
        <img id="logo" src="/Harbor-logo.png" />
        <h2>Cashflow Projection Chart</h2>
        <h4>
          Please enter your birthday, and your spouse's birthday (<i>if applicable</i>) in the form below!
        </h4>
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
        <div className="grid-container">
          <Grid
            rows={rows}
            columns={columns}>
            <RowDetailState />
            <PagingState pageSize={5} defaultPageSize={5} />
            <LocalPaging />
            <TableView />
            <TableHeaderRow />
            <PagingPanel />
            <TableRowDetail template={this.generateRowDetails} />
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
  updateBirthdays(userBirthday, spouseBirthday) {
    dispatch(viewCashflow(userBirthday, spouseBirthday))
  }
})

const CashflowProjection = connect(mapStateToProps, mapDispatchToProps)(CashProjComponent)

export default CashflowProjection
