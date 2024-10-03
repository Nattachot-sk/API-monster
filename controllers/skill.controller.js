const prisma = require("../prisma/prisma");

const createSkill = async (req, res) => {
  try {
    const { name, damage, mana } = req.body;
    if (!name || !damage || !mana ) {
     return res.status(401).json({ message: "โปรดใส่ให้ครบ" });
    }

    const skill = await prisma.skill.create({
      data: {
        name: name,
        damage: damage,
        mana: mana,
      },
    });
    res.status(201).json({message: "สร้าง Skill" ,skill: skill });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  }
};
const getSkill = async(req,res) =>{
  try {
    const skill = await prisma.skill.findMany()

    res.status(201).json(skill)
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  
  }
}

const deleteSkill = async(req,res) =>{
  try {
    const { id } =req.body
    const skill = await prisma.item.delete({
      where:{ id: Number(id)}
    })
    res.status(201).json({message:"ลบ Skill ", Skill: skill})
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  }
}

module.exports = {
  createSkill,
  getSkill,
  deleteSkill
};
