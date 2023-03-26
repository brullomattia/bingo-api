
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




module.exports = {
    addUser,
    
}