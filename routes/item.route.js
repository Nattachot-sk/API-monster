const express = require('express')
const router = express.Router()
const itemController = require("../controllers/item.controller")

router.post("/createrariry",itemController.createRarity)
router.post("/createitem",itemController.createItem)
router.get("/getitem",itemController.getItem)
router.post("/sellitem/:id",itemController.sellItem)
router.delete("/deleteitem/:id",itemController.deleteItem)

module.exports = router