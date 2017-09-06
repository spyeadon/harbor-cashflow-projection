'use strict'

const {STRING, JSON, DATE, INTEGER, DECIMAL} = require('sequelize')

module.exports = db => db.define('incomeSpouse', {
  start_date: DATE,
  end_date: DATE,
  total: DECIMAL,
  sources: JSON
})
