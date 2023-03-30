
const db = require('../models')

const User = db.users

const addUser = async (req, res) => {
    const { nickname, mobile_id} = req.body;
    
    let info = {
        nickname: nickname,
        mobile_id: mobile_id,
        points: 0
    }
    //console.log(info);
    try {
        const user = await User.create(info);
        res.status(200).send(user);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
    
}

const auth = async (req, res) => {
    const { mobile_id } = req.params.mobile_id;
    
    try {
        let user = await User.findOne({ 
            where : {
                mobile_id : mobile_id,
            }
        })

        res.status(200).send(user);
    } catch (error) {
        res.sendStatus(404);
    }
    
}

const getUsers = async (req, res) => {
    
    try {
        let users = await User.findAll();

        res.send({data: users});
    } catch (error) {
        res.send({error: error});
    }
}

const ready = async (req, res) => {
    const match_id = req.params.match_id;

    try {
        await Match.increment('connected',{ where: { id: match_id}})
        res.status(200);
    } catch (error) {
        res.status(400).send({error: error});
    }
}




module.exports = {
    addUser,
    auth,
    getUsers,
    ready
    
}