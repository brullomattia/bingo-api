const matchNumbers = require('../helpers/random_number');
const db = require('../models')

const Match = db.matches;
const Card = db.cards;
const User = db.users;

const addMatch = async (req, res) => {
    const { n_cards } = req.body;
    const random_number = matchNumbers();
    
    let info = {
        n_cards: n_cards,
        state: 'pending',
        numbers: random_number,
        actual_move: 0
    }
    //console.log(info);
    try {
        const match = await Match.create(info);
        res.status(200).send(match);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
    
}




const startGame = async (req, res) => {
    const match_id = req.params.match_id;

    let info = {
        state: 'started'
    }

    try {
        const match = await Match.update(info, { where: { id: match_id }})
        res.status(200).send({message: 'Match started'})
    } catch (error) {
        res.send(error);
    }
    
    
}

const checkFive = async (req, res) => {
    try {
        const {user_id, match_id} = req.body;
        let actual_move;
        let extracted_numbers;
        let five;
        await Match.findByPk(match_id).then(match => {
            actual_move=match.actual_move;
            extracted_numbers = match.numbers.slice(0, actual_move+1);
            five = match.five;
        })
        
        if(five){
            res.status(400).send({ message: "Five already declared!"})
        } else {
            let result;
            let cards = await Card.findOne({ 
                where : {
                    user_id : user_id,
                    match_id: match_id
                }
            })
            for (let i = 0; i < cards.lenght; i++) {
                result = checkFive(cards[i], extracted_numbers);
                if(result){
                    break;
                }
            }

            if(result){
                await Match.update({five: true}, { where: { id: match_id }});
                await User.increment('points',{by: 5, where: { id: user_id }});

                res.status(200).send({message: 'You get 5 points'});
            } else {
                res.status(400).send({message:  'You don t get 5 points'});
            }   
        }

        
    } catch (error) {
        res.send(error);
    }
}

const checkBingo = async (req, res) => {
    try {
        const {user_id, match_id} = req.body;
        let actual_move;
        let extracted_numbers;
        let bingo;

        await Match.findByPk(match_id).then(match => {
            actual_move = match.actual_move;
            extracted_numbers = match.numbers.slice(0, actual_move+1);
            bingo = match.bingo;
        })

        if(bingo){
            res.status(400).send({ message: "Bingo already declared!"})
        } else {
            let result;
            let cards = await Card.findOne({ 
                where : {
                    user_id : user_id,
                    match_id: match_id
                }
            });

            for (let i = 0; i < cards.lenght; i++) {
                result = checkBingo(cards[i], extracted_numbers);
                if(result){
                    break;
                }
            }

            if(result){
                await Match.update({bingo: true, state: 'closed'}, { where: { id: match_id }});
                await User.increment('points',{by: 20, where: { id: user_id }});

                res.status(200).send({message: 'You get 20 points'});
            } else {
                res.status(400).send({message:  'You don t get BINGO!'});
            }   
        }


        
    } catch (error) {
        res.send(error);
    }
}


module.exports = {
    addMatch,
    startGame,
    checkFive,
    checkBingo,
    
}