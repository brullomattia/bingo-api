const db = require("../models");

const User = db.users;
const Match = db.matches;

const addUser = async (req, res) => {
  const { nickname, mobile_id } = req.body;
  try {
    let info = {
      nickname: nickname,
      mobile_id: mobile_id,
      points: 0,
    };
    //console.log(info);
    if (nickname.length < 5) {
      throw error;
    }
    const user = await User.create(info);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

const auth = async (req, res) => {
  const { mobile_id } = req.params;

  try {
    let user = await User.findOne({
      where: {
        mobile_id: mobile_id,
      },
    });
    console.log(user);
    if (user != null) {
      res.status(200).send(user);
    } else res.sendStatus(404);
  } catch (error) {
    console.log(error);
    //res.sendStatus(404);
  }
};

const getUsers = async (req, res) => {
  try {
    let users = await User.findAll();

    res.send({ data: users });
  } catch (error) {
    res.send({ error: error });
  }
};

const ready = async (req, res) => {
  try {
    const match_id = req.params.match_id;
    console.log(match_id);

    await Match.increment("connected", { where: { id: match_id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const exit = async (req, res) => {
  try {
    const match_id = req.params.match_id;
    console.log(match_id);

    await Match.increment("players", { by: -1, where: { id: match_id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = {
  addUser,
  auth,
  getUsers,
  ready,
  exit,
};
