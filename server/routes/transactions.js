const express = require('express')
const router = express.Router()
const {allTransactions} = require('../controllers/transactions')

router.get("/", allTransactions)

module.exports = router;