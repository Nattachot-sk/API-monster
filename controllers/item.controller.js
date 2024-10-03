const prisma = require("../prisma/prisma");

const createRarity = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({ message: "โปรดกรอกข้อมูล" });
    }
    const rarity = await prisma.rarity.create({
      data: { name: name },
    });
    res.status(200).json({ message: "สร้าง Rare", rarity });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, description, price, dropRate, rarityId } = req.body;

    if (!name || !description || !price || !dropRate || !rarityId) {
      return res.status(401).json({ message: "โปรดกรอกให้ครบ" });
    }
    const item = await prisma.item.create({
      data: {
        name: name,
        description: description,
        price: price,
        dropRate: dropRate,
        rarityId: rarityId,
      },
    });
    res.status(201).json({ message: "สร้าง Item", item });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await prisma.item.findMany();

    res.status(201).json({ message: "แสดงไอเทม", item: item });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const sellItem = async (req, res) => {
  try {
    const { id } = req.params
    const {  itemId, quantitySell } = req.body;

    const inventory = await prisma.inventory.findUnique({
      where: {
        playerId_itemId: {
          playerId: Number(id),
          itemId: Number(itemId),
        },
      },
      include: { item: true },
    });
    if (!inventory) {
      return res.status(404).json({ error: "ไม่พบไอเทมในคลังของผู้เล่น" });
    }
    if (inventory.quantity < quantitySell) {
      return res.status(400).json({ error: "จำนวนไอเทมไม่เพียงพอที่จะขาย" });
    }

    const item = await prisma.item.findUnique({
      where: { id: Number(itemId) },
    });
    if (!item) {
      return res.status(404).json({ error: "ไม่พบไอเทม" });
    }

    const sellPrice = item.price * quantitySell;

    const player = await prisma.player.update({
      where: { id: Number(id) },
      include: { inventory: true },
      data: { money: { increment: sellPrice } },
    });

    if (inventory.quantity === quantitySell) {
      await prisma.inventory.delete({
        where: {
          playerId_itemId: {
            playerId: Number(id),
            itemId: Number(itemId),
          },
        },
      });
    } else {
      await prisma.inventory.update({
        where: {
          playerId_itemId: {
            playerId: Number(id),
            itemId: Number(itemId),
          },
        },
        data: {
          quantity: { decrement: quantitySell },
        },
      });
    }

    res
      .status(200)
      .json({ message: `ขายไอเทม ได้รับเงิน ${sellPrice} `, player: player });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.item.delete({
      where: { id: Number(id) },
    });
    res.status(201).json({ message: "ลบไอเทม", item: item });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  createRarity,
  createItem,
  getItem,
  sellItem,
  deleteItem,
};
