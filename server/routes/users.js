const express = require('express');
const router = express.Router();
const {allUsers, user} = require('../controllers/users')

router.get("/", allUsers )
router.get("/:id", user )

module.exports = router;