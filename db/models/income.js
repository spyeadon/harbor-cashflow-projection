'use strict'

const {STRING, JSON, DATE, INTEGER, DECIMAL} = require('sequelize')

module.exports = db => db.define('income', {
  start_date: DATE,
  end_date: DATE,
  total: DECIMAL,
  sources: JSON
})
