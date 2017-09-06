const db = require('APP/db')
const Income = db.model('income')
const IncomeSpouse = db.model('incomeSpouse')

module.exports = require('express').Router()
  .get('/spouse', (req, res, next) => {
    IncomeSpouse.findAll()
    .then(income => res.json(income))
  })
  .get('/individual', (req, res, next) => {
    Income.findAll()
    .then(income => res.json(income))
  })
