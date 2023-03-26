const userController = require('./controllers/user.controller.js')
const matchController = require('./controllers/match.controller.js')
const cardController = require('./controllers/card.controller.js')

const router = require('express').Router();

//users
router.post('/users/addUser', userController.addUser);

//matches
router.post('/matches/addMatch', matchController.addMatch);
router.put('/matches/startGame/:match_id', matchController.startGame);
router.put('/matches/checkFive', matchController.checkFive);
router.put('/matches/checkBingo', matchController.checkBingo);

//cards
router.post('/cards/joinGame', cardController.joinGame); 




module.exports = router;