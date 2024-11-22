const express = require('express');
const router = express.Router();
const{allProperties, Property} = require("../controllers/properties")

router.get("/", allProperties)

router.get("/:id", Property)

module.exports = router;