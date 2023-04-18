const express = require("express");
const cors = require("cors");
const db = require("./models");

const Match = db.matches;
const app = express();

//app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//routers
const router = require("./routes.js");
app.use("/api", router);

app.get("/start_game/:id", async (req, res) => {
  const match_id = req.params.id;
  //await Match.increment('connected',{ where: { id: match_id}})
  //res.set("Content-Type", "text/event-stream");
  //res.set("Connection", "keep-alive");
  res.set("Cache-Control", "no-cache");
  res.set("Access-Control-Allow-Origin", "*");
  let actual_move = 0;
  setInterval(async function () {
    try {
      let players;
      let connected;
      let state;
      let numbers;
      let match = await Match.findOne({
        where: {
          id: match_id,
        },
      });

      players = match.players;
      connected = match.connected;
      state = match.state;
      numbers = match.numbers;
      actual_move = match.actual_move;

      if (connected == players && state == "pending") {
        //PARTITA INIZIATA
        await Match.update({ state: "started" }, { where: { id: match_id } });
      }

      if (players > 0 && connected == players && state == "started") {
        //ESTRAZIONE NUMERI
        await Match.increment("actual_move", { where: { id: match_id } });
      } else if (state == "closed" || actual_move > 91 || players == 0) {
        await Match.update({ state: "closed" }, { where: { id: match_id } });
        res.end();
      }
    } catch (error) {
      console.log(error);
    }
  }, 5000);
});

app.get("/", (req, res) => {
  res.send({ message: "hello" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("server is runnng on port: " + PORT);
});
