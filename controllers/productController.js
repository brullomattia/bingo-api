
const db = require('../models')

const Product = db.products

const addProduct = async (req, res) => {
    const { title, price, description } = req.body;
    
    let info = {
        title: title,
        price: price,
        description: description
    }
    //console.log(info);
    try {
        const product = await Product.create(info);
        res.status(200).send(product);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
    
}

const getAllProducts = async (req, res) => {
    let products = await Product.findAll({
        attributes: [
            'title',
            'price',
            'description'
        ]
    });
    res.status(200).send(products);
}

module.exports = {
    addProduct
}