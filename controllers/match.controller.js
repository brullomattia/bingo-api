const check_bingo = require("../helpers/check_bingo");
const check_five = require("../helpers/check_five");
const matchNumbers = require("../helpers/random_number");
const db = require("../models");

const Match = db.matches;
const Card = db.cards;
const User = db.users;

const addMatch = async (req, res) => {
  const { n_cards } = req.body;
  const random_number = matchNumbers();

  let info = {
    n_cards: n_cards,
    state: "pending",
    numbers: random_number,
    actual_move: 0,
  };
  //console.log(info);
  try {
    const match = await Match.create(info);
    res.status(200).send(match);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const checkFive = async (req, res) => {
  try {
    const { user_id, match_id } = req.body;
    let actual_move;
    let extracted_numbers;
    let five;
    await Match.findByPk(match_id).then((match) => {
      actual_move = match.actual_move;
      extracted_numbers = match.numbers.slice(0, actual_move + 1);
      five = match.five;
    });
    if (five) {
      res
        .status(200)
        .send({ status: false, message: "Five already declared!" });
    } else {
      let result;
      let response = await Card.findOne({
        where: {
          user_id: user_id,
          match_id: match_id,
        },
      });
      let cards = response.cards;
      for (let i = 0; i < cards.length; i++) {
        result = check_five(cards[i], extracted_numbers);
        console.log(result);
        if (result) {
          break;
        }
      }

      if (result) {
        await Match.update({ five: true }, { where: { id: match_id } });
        await User.increment("points", { by: 5, where: { id: user_id } });

        res.status(200).send({ status: true, message: "You get 5 points" });
      } else {
        res
          .status(200)
          .send({ status: false, message: "You don t get 5 points" });
      }
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const checkBingo = async (req, res) => {
  try {
    const { user_id, match_id } = req.body;
    let actual_move;
    let extracted_numbers;
    let bingo;

    await Match.findByPk(match_id).then((match) => {
      actual_move = match.actual_move;
      extracted_numbers = match.numbers.slice(0, actual_move + 1);
      bingo = match.bingo;
    });

    //console.log(actual_move, extracted_numbers, bingo);
    if (bingo) {
      res
        .status(200)
        .send({ status: false, message: "Bingo already declared!" });
    } else {
      let result;

      let cards = await Card.findOne({
        where: {
          user_id: user_id,
          match_id: match_id,
        },
      });
      cards = cards.dataValues.cards;

      for (let i = 0; i < cards.length; i++) {
        result = check_bingo(cards[i], extracted_numbers);
        if (result) {
          break;
        }
      }

      if (result) {
        await Match.update(
          { bingo: true, state: "closed" },
          { where: { id: match_id } }
        );
        await User.increment("points", { by: 20, where: { id: user_id } });

        res.status(200).send({ status: true, message: "You get 20 points" });
      } else {
        res
          .status(200)
          .send({ status: false, message: "You don t get BINGO!" });
      }
    }
  } catch (error) {
    res.send(error);
  }
};

const getNumber = async (req, res) => {
  try {
    const match_id = req.params.match_id;
    let actual_move;
    let numbers;
    let state;
    let five;
    let bingo;

    await Match.findByPk(match_id).then((match) => {
      actual_move = match.actual_move;
      numbers = match.numbers;
      state = match.state;
      five = match.five;
      bingo = match.bingo;
    });
    res.send({
      number: numbers[actual_move],
      state: state,
      five: five,
      actual_move: actual_move,
      bingo: bingo,
    });
  } catch (error) {
    res.send({ error: error });
  }
};

const getMatches = async (req, res) => {
  let state = req.params.state;
  try {
    let matches = await Match.findAll({
      where: {
        state: state,
      },
    });
    res.send({ data: matches });
  } catch (error) {
    res.send({ error: error });
  }
};

const getMatch = async (req, res) => {
  try {
    let match_id = req.params.match_id;
    let match = await Match.findByPk(match_id);
    res.send({ data: match });
  } catch (error) {
    res.send({ error: error });
  }
};

module.exports = {
  addMatch,
  getMatches,
  checkFive,
  checkBingo,
  getNumber,
  getMatch,
};
