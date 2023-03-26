
const  randomCards = require('../helpers/random_cards.js');
const db = require('../models')

const Card = db.cards
const Match = db.matches

const joinGame = async (req, res) => {
    const { user_id, match_id} = req.body;
    try {
    let n_cards;
    
    await Match.findByPk(match_id).then(match => {
        n_cards=match.n_cards 
    })
    const cards = randomCards(n_cards);

    let info = {
        user_id: user_id,
        match_id: match_id,
        cards: cards
    }
    //console.log(info);
    
        const card = await Card.create(info);
        await Match.increment('players',{ where: { id: match_id }} )
        res.status(200).send(card);
    } catch (error) {
        res.send(error);
        console.log(error)
    }
}




module.exports = {
    joinGame
}