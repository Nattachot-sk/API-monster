const express = require('express')
const router = express.Router()
const playerController = require('../controllers/player.controller')


router.get("/player",playerController.getPlayer)
router.get("/player/:id",playerController.getPlayerById)
router.get("/statusplayer",playerController.statusPlayer)
router.get("/playerinventory/:playerId",playerController.getInventoryPlayer)
router.post("/create", playerController.createPlayer)

router.delete("/player/:id", playerController.deletePlayer)


module.exports = router