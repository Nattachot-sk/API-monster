const prisma = require("../prisma/prisma");

// const attackMonster = async (req, res) => {
//   try {
//     const { id, username, email } = req.body;

//     if (!id && !username && !email) {
//       return res
//         .status(400)
//         .json({ error: "ต้องระบุ playerId, username หรือ email" });
//     }

//     const whereCondition = {};
//     if (id) {
//       whereCondition.id = id;
//     } else if (username) {
//       whereCondition.username = username;
//     } else if (email) {
//       whereCondition.email = email;
//     }

//     const player = await prisma.player.findUnique({
//       where: whereCondition,
//       include: { status: true },
//     });

//     if (!player) {
//       return res.status(404).json({ error: "ไม่พบผู้เล่น" });
//     }
//     const playerStatus = player.status[0];
//     console.log({ playerStatus: playerStatus });

//     const monsters = await prisma.monster.findMany();

//     const groupMonsters = monsters.reduce((acc, monster) => {
//       const level = monster.rankmonster.level.toLowerCase();
//       if (!acc[level]) {
//         acc[level] = [];
//       }
//       acc[level].push(monster);
//       return acc;
//     }, {});

//     const getRandomMonster = () => {
//       const levels = Object.keys(groupMonsters);
//       const randomLevel = levels[Math.floor(Math.random() * levels.length)];
//       const monsterList = groupMonsters[randomLevel];

//       if (!monsterList || monsterList.length === 0) {
//         return null;
//       }
//       return monsterList[Math.floor(Math.random() * monsterList.length)];
//     };

//     let monster = getRandomMonster();
//     console.log({ mosnter: monster });
//     if (!monster) {
//       return res.status(404).json({ error: "ไม่พบมอนสเตอร์" });
//     }

//     const critical = playerStatus.critical;
//     const randomValue = Math.floor(Math.random() * 100) + 1;
//     let damage = playerStatus.attack;
//     if (randomValue >= 80) {
//       damage *= critical;
//     } else if (randomValue >= 70) {
//       damage *= 1.5;
//     } else if (randomValue >= 65) {
//       damage *= 1.2;
//     } else {
//       damage *= 1;
//     }

//     monster.health -= damage; //

//     const attackfinish = monster.health - damage;

//     console.log({ attckfinish: damage });

//     const dropItems = async () => {
//       // ดึงไอเทมทั้งหมด
//       const items = await prisma.item.findMany();

//       const randomValue = Math.random();
//       let cumulativeProbability = 0;

//       for (const item of items) {
//         cumulativeProbability += item.dropRate;
//         if (randomValue <= cumulativeProbability) {
//           return item;
//         }
//       }

//       return null;
//     };

//     if (monster.health <= 0) {
//       await prisma.monster.delete({ where: { id: monster.id } });

//       const droppedItem = await dropItems(monster.id);
//       if (droppedItem) {
//         await prisma.inventory.create({
//           data: {
//             playerId: player.id,
//             itemId: droppedItem.id,
//             name: droppedItem.name,
//             quantity: 1,
//           },
//         });
//         return res.json({
//           message: "มอนสเตอร์ถูกโจมตีจนตาย! มอนสเตอร์ใหม่ถูกสุ่ม",
//           newMonster: monster,
//           droppedItem: droppedItem,
//         });
//       }

//       monster = getRandomMonster();

//       if (!monster) {
//         return res.status(404).json({ error: "ไม่พบมอนสเตอร์ใหม่" });
//       }

//       return res.json({
//         message: "มอนสเตอร์ถูกโจมตีจนตาย มอนสเตอร์ใหม่ถูกสุ่ม",
//         newMonster: monster,
//       });
//     }

//     const update = await prisma.monster.update({
//       where: { id: monster.id },
//       data: { health: monster.health },
//     });
//     console.log("Monster Health before update:", monster.health);

//     res.json({
//       message: "คุณโจมตีมอนเตอร์",
//       monter: update,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// };

const attackMonsterOne = async (req, res) => {
  try {
    const { monsterId } = req.params;
    const { id, username, email } = req.body;

    if (!id && !username && !email) {
      return res
        .status(400)
        .json({ error: "ต้องระบุ playerId, username หรือ email" });
    }

    const whereCondition = {};
    if (id) {
      whereCondition.id = id;
    } else if (username) {
      whereCondition.username = username;
    } else if (email) {
      whereCondition.email = email;
    }

    const player = await prisma.player.findUnique({
      where: whereCondition,
      include: { status: true },
    });

    if (!player) {
      return res.status(404).json({ error: "ไม่พบผู้เล่น" });
    }

    const playerStatus = player.status[0];
    console.log(playerStatus);
    const monster = await prisma.monster.findUnique({
      where: { id: parseInt(monsterId) },
    });

    if (!monster) {
      return res.status(404).json({ error: "ไม่พบมอนสเตอร์" });
    }

    const critical = playerStatus.critical;
    const randomValue = Math.floor(Math.random() * 100) + 1;
    let damage = playerStatus.attack;

    if (randomValue >= 80) {
      damage *= critical;
    } else if (randomValue >= 70) {
      damage *= 1.5;
    } else if (randomValue >= 65) {
      damage *= 1.2;
    }

    monster.health -= damage;

    if (monster.health <= 0) {
      const monsterDie = await prisma.monster.delete({
        where: { id: parseInt(monsterId) },
      });

      const experienceMonster = monsterDie.experience;

      console.log({ exp: experienceMonster });
      const playerexp = player.status;

      let plusepx = (playerStatus.experience += experienceMonster);
      console.log(plusepx);

      const requireExp = 100 + playerStatus.level * 20;
      if (plusepx >= requireExp) {
        playerStatus.level += 1;
        plusepx -= requireExp;

        await prisma.status.update({
          where: { id: playerStatus.id },
          data: { 
            experience: plusepx, 
            level: playerStatus.level },
        });

      } else {
        await prisma.status.update({
          where: { id: playerStatus.id },
          data: { experience: plusepx },
        });
      }

      const dropItems = async () => {
        //สุ่มไอเทม
        const items = await prisma.item.findMany();

        if (!Array.isArray(items) || items.length === 0) {
          //ตรวจสอบว่ามีค่าไหม
          return null;
        }

        const randomValue = Math.random(); // สุ่ม
        let cumulativeProbability = 0;

        //loop
        for (const item of items) {
          cumulativeProbability += item.dropRate; //ค่าdrop ในฐาน
          if (randomValue <= cumulativeProbability) {
            return item;
          }
        }
        //ไม่มีดรอป
        return null;
      };

      const droppedItem = await dropItems();

      if (droppedItem) {
        const checkItem = await prisma.inventory.findUnique({
          where: {
            playerId_itemId: {
              playerId: id,
              itemId: parseInt(droppedItem.id),
            },
          },
        });

        //เช้ดของซ้ำ
        if (checkItem) {
          const updateInventory = await prisma.inventory.update({
            where: {
              playerId_itemId: {
                playerId: id,
                itemId: parseInt(droppedItem.id),
              },
            },
            data: {
              quantity: checkItem.quantity + 1,
            },
          });
        } else {
          //ถ้าของไม่มี
          const addItem = await prisma.inventory.create({
            data: {
              playerId: id,
              itemId: parseInt(droppedItem.id),
              name: "item",
              quantity: 1,
            },
            include: { player: true },
          });
        }
        return res.json({
          message: "มอนเตอร์ตาย ได้รับไอเทม",
          droppedItem: droppedItem,
          exp: {
            message: `คุณได้รับ ${experienceMonster} EXP จากการฆ่ามอนสเตอร์`,
          },
          level: playerStatus.level,
        });
      } else {
        return res.json({
          message: "มอนเตอร์ตาย แต่ไม่มีไอเทมดรอป",
        });
      }
    }

    const updatedMonster = await prisma.monster.update({
      where: { id: parseInt(monsterId) },
      data: { health: monster.health },
    });

    res.json({
      message: "โจมตีมอนเตอร์",
      monster: updatedMonster,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

const useSkillAttack = async (req, res) => {
  try {
    const { monsterId } = req.params;
    const { id, username, email } = req.body;

    if (!id && !username && !email) {
      return res
        .status(400)
        .json({ error: "ต้องระบุ playerId, username หรือ email" });
    }

    const whereCondition = {};
    if (id) {
      whereCondition.id = id;
    } else if (username) {
      whereCondition.username = username;
    } else if (email) {
      whereCondition.email = email;
    }

    const player = await prisma.player.findUnique({
      where: whereCondition,
      include: { status: true, skill: true },
    });

    if (!player) {
      return res.status(404).json({ error: "ไม่พบผู้เล่น" });
    }

    const playerStatus = player.status[0];

    const monster = await prisma.monster.findUnique({
      where: { id: parseInt(monsterId) },
    });


    if (!monster) {
      return res.status(404).json({ error: "ไม่พบมอนสเตอร์" });
    }

    const SkillDamage = player.skill.damage; // ดาเมทของสกิว
    const Skillname = player.skill.name; // ชื่อสกิว

    monster.health -= SkillDamage;

    if (monster.health <= 0) {
      const monsterDie = await prisma.monster.delete({
        where: { id: parseInt(monsterId) },
      });

      const experienceMonster = monsterDie.experience;

      console.log({ exp: experienceMonster });
      const playerexp = player.status;

      let plusepx = (playerStatus.experience += experienceMonster);

      const requireExp = 100 + playerStatus.level * 20;
      if (plusepx >= requireExp) {
        playerStatus.level += 1;
        plusepx -= requireExp;

        await prisma.status.update({
          where: { id: playerStatus.id },
          data: { experience: plusepx, level: playerStatus.level },
        });
      } else {
        await prisma.status.update({
          where: { id: playerStatus.id },
          data: { experience: plusepx },
        });
      }

      const dropItems = async () => {
        const items = await prisma.item.findMany();

        if (!Array.isArray(items) || items.length === 0) {
          return null;
        }

        const randomValue = Math.random();
        let cumulativeProbability = 0;

        for (const item of items) {
          cumulativeProbability += item.dropRate;
          if (randomValue <= cumulativeProbability) {
            return item;
          }
        }

        return null;
      };

      const droppedItem = await dropItems();
      // ดรอปไอเทม
      if (droppedItem) {
        const checkItem = await prisma.inventory.findUnique({
          where: {
            playerId_itemId: {
              playerId: id,
              itemId: parseInt(droppedItem.id),
            },
          },
        });
        if (checkItem) {
          const updateInventory = await prisma.inventory.update({
            where: {
              playerId_itemId: {
                playerId: id,
                itemId: parseInt(droppedItem.id),
              },
            },
            data: {
              quantity: checkItem.quantity + 1,
            },
          });
        } else {
          const addItem = await prisma.inventory.create({
            data: {
              playerId: id,
              itemId: parseInt(droppedItem.id),
              name: "item",
              quantity: 1,
            },
            include: { player: true },
          });
        }
        return res.json({
          message: "มอนเตอร์ตาย ได้รับไอเทม",
          droppedItem: droppedItem,
          exp: {
            message: `คุณได้รับ ${experienceMonster} EXP จากการฆ่ามอนสเตอร์`,
          },
          level: playerStatus.level,
        });
      } else {
        return res.json({
          message: "มอนเตอร์ตาย แต่ไม่มีไอเทมดรอป",
        });
      }
    }

    const updatedMonster = await prisma.monster.update({
      where: { id: parseInt(monsterId) },
      data: { health: monster.health },
    });

    res.json({
      message: `คุณได้ใช้สกิว ${Skillname} ใส่มอนเตอร์`,
      damage: SkillDamage,
      monster: updatedMonster,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

module.exports = {
  attackMonsterOne,
  useSkillAttack,
};
