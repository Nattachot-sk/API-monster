const express = require('express')
const router = express.Router()
const monsterController = require('../controllers/monster.controller')



router.get('/monster', monsterController.getAllmonster)

router.post('/createmonster', monsterController.creatMonster)

router.post('/createmonsterRandom', monsterController.creatMonsterRandom)


module.exports = router