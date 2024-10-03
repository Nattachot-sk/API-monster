const prisma = require("../prisma/prisma");
// const { monsters } = require("../data/data");

// const getMonster = async (req, res) => {
//   try {
//     const monsters = await prisma.monster.findMany({
//       include: { rankmonster: true },
//     });

//     const groupMonsters = monsters.reduce((acc, monster) => {
//       const level = monster.rankmonster.level;
//       const toLowercaselevel = level.toLowerCase();
//       if (!acc[toLowercaselevel]) {
//         acc[toLowercaselevel] = [];
//       }
//       acc[toLowercaselevel].push(monster);
//       return acc;
//     }, {});

//     const getRandomMonster = () => {
//       const levels = Object.keys(groupMonsters);
//       const randomLevel = levels[Math.floor(Math.random() * levels.length)];
//       const monsterList = groupMonsters[randomLevel];

//       if (!monsterList || monsterList.length === 0) {
//         return null;
//       }
//       const randomMonster =
//         monsterList[Math.floor(Math.random() * monsterList.length)];

//       return { ...randomMonster, currentHealth: randomMonster.health };
//     };

//     const monster = getRandomMonster();
//     if (monster) {
//       res.json(monster);
//     } else {
//       res.status(404).json({ error: "ไม่พบมอนสเตอร์" });
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// };

const creatMonsterRandom = async (req, res) => {
  try {

    const getRandomValue = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min; //สุ่มค่าพลัง
    };
    const monsterNames = [
      "Goblin",
      "Rat",
      "Dragon",
      "Slime",
      "Troll",
      "Vampire",
      "Chicken",
      "Pokemon",
      "Lord",
      "Knight",
    ];
    const monsterRanks = ["E", "D", "C", "B", "A", "S"];
    const rank = monsterRanks[getRandomValue(0, monsterRanks.length - 1)];

    const generateMonsterStats = (rank) => {
      switch (rank) {
        case "E":
          return {
            health: getRandomValue(30, 80),
            attack: getRandomValue(10, 20),
            defense: getRandomValue(5, 10),
            experience: getRandomValue(5, 20),
          };
        case "D":
          return {
            health: getRandomValue(100, 150),
            attack: getRandomValue(20, 30),
            defense: getRandomValue(15, 20),
            experience: getRandomValue(40, 60),
          };
        case "C":
          return {
            health: getRandomValue(150, 200),
            attack: getRandomValue(30, 40),
            defense: getRandomValue(20, 30),
            experience: getRandomValue(60, 80),
          };
        case "B":
          return {
            health: getRandomValue(200, 250),
            attack: getRandomValue(50, 75),
            defense: getRandomValue(30, 45),
            experience: getRandomValue(80, 100),
          };
        case "A":
          return {
            health: getRandomValue(500, 750),
            attack: getRandomValue(80, 100),
            defense: getRandomValue(50, 75),
            experience: getRandomValue(200, 250),
          };
        case "S":
          return {
            health: getRandomValue(1000, 1500),
            attack: getRandomValue(120, 200),
            defense: getRandomValue(80, 90),
            experience: getRandomValue(450, 650),
          };
        default:
          return { health: 50, attack: 10, defense: 5, experience: 20 };
      }
    };

    const monsterStats = generateMonsterStats(rank);

    const randomMonster = {
      name: monsterNames[getRandomValue(0, monsterNames.length - 1)],
      ...monsterStats, 
      rank: rank, 
    };
    console.log({maseege:randomMonster})

    const newMonster = await prisma.monster.create({
      data: randomMonster,
    });

    res
      .status(201)
      .json({ message: "สร้างมอนเตอร์สำเร็จ", monster: newMonster });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getAllmonster = async (req, res) => {
  try {
    const monster = await prisma.monster.findMany();

    res.status(201).json({ monster: monster });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};




const creatMonster = async (req, res) => {
  try {
    const { name, health, attack, defense, experience,} =
      req.body;
    if (
      !name ||
      !health ||
      !attack ||
      !defense ||
      !experience 
    ) {
      return res.status(400).json({ message: "โปรดใส่ข้อมูลให้ครบ" });
    }

    const monster = await prisma.monster.create({
      data: {
        name,
        health,
        attack,
        defense,
        experience,
      },
    });

    return res.status(201).json({ message: "สร้างมอนเตอร์สำเร็จ", monster });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};


module.exports = {
  getAllmonster,

  creatMonsterRandom,

  creatMonster,
};
