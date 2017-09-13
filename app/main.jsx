'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import {getCashflowSpouse, getCashflow} from './reducers/projections.jsx'

import store from './store'
import CashflowProjection from './components/CashflowProjection.jsx'

const retrieveCashflow = () => {
  store.dispatch(getCashflowSpouse())
  store.dispatch(getCashflow())
}

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp} onEnter={retrieveCashflow}>
        <IndexRedirect to="/projection" />
        <Route path="/projection" component={CashflowProjection} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
