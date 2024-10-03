const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

const createPlayer = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, skill } = req.body;

    if (!username || !email || !password || !confirmPassword || !skill) {
      return res.status(400).json({ message: "โปรดใส่ให้ครบ" });
    }

    const existingEmail = await prisma.player.findUnique({
      where: { email: email },
    });
    if (existingEmail) {
      return res.status(400).json({ error: "อีเมลนี้มีการใช้งานแล้ว" });
    }
    const existingUsername = await prisma.player.findUnique({
      where: { username: username },
    });
    if (existingUsername) {
      return res.status(400).json({ error: "ชื่อนี้มีการใช้งานแล้ว" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const hash = await bcrypt.hash(password, salt);

    const result = await prisma.$transaction(async (prisma) => {
      const player = await prisma.player.create({
        data: {
          username: username,
          email: email,
          password: hash,
          skillId: Number(skill),
        },
        include: { skill: true },
      });
      const status = await prisma.status.create({
        data: {
          playerId: player.id,
        },
      });
      return { player, status };
    });

    return res.status(201).json({ message: "register success", result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getPlayer = async (req, res) => {
  try {
    const player = await prisma.player.findMany({
      include: { status: true },
    });

    return res.status(201).json(player);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;

    const findplayer = await prisma.player.findMany();

    if (!findplayer) {
      res.status(401).json({ message: "ไม่พบผู้เล่น" });
    }

    const player = await prisma.player.findUnique({
      where: { id: Number(id) },
      include: { status: true, inventory: true },
    });

    res.status(201).json({ player: player });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  }
};

const statusPlayer = async (req, res) => {
  try {
    const status = await prisma.status.findMany();

    res.status(201).json({ status: status });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  }
};

const getInventoryPlayer = async (req, res) => {
  try {
    const { playerId } = req.params;

    const findplayer = await prisma.player.findMany();

    if (!findplayer) {
      res.status(401).json({ message: "ไม่พบผู้เล่น" });
    }

    const player = await prisma.player.findUnique({
      where: { id: Number(playerId) },
      include: { status: true, inventory: true },
    });

    res.status(201).json({ player: player });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", details: error.message });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.$transaction(async (prisma) => {

      
      const status = await prisma.status.delete({
        where: { playerId: Number(id) },
      });

      const player = await prisma.player.delete({
        where: { id: Number(id) },
        include: { status: true },
      });
      return { player, status };
    });
    return res.status(200).json({ message: "ลบสำเร็จ", player: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  createPlayer,
  getPlayer,
  getPlayerById,
  statusPlayer,
  getInventoryPlayer,
  deletePlayer,
};
