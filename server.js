const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const morgan = require("morgan");

//route
const monster = require("./routes/monster.route");
const player = require("./routes/player.route");
const attack = require("./routes/attack.route");
const item = require("./routes/item.route");
const skill = require("./routes/skill.route")

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
env.config();

app.use("/api", monster);
app.use("/api", player);
app.use("/api", attack);
app.use("/api", item);
app.use("/api", skill);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
