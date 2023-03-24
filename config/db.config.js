module.exports = {
    HOST: '127.0.0.1',
    USER: 'root',
    PASSWORD: 'password',
    DB: 'bingo_api_db',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}