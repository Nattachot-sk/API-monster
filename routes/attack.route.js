const express = require("express")
const router = express.Router()
const attackController = require("../controllers/attack.controller")


router.post("/attackone/:monsterId",attackController.attackMonsterOne)
router.post("/useskill/:monsterId",attackController.useSkillAttack)

module.exports = router