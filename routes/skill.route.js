const express = require("express")
const router = express.Router()
const skillController = require("../controllers/skill.controller")

router.post("/createskill", skillController.createSkill)
router.get("/skill", skillController.getSkill)
router.delete("/deleteskill/:id", skillController.deleteSkill)


module.exports = router