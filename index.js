const express = require('express');
const cors = require('cors');
const db = require('./models')

const Match = db.matches;
const app = express();

//app.use(express.json());

app.use(express.urlencoded({ extended: true}));

//middleware
app.use(express.json())

app.use(express.urlencoded({ extended: true }))


//routers
const router = require('./routes.js');
app.use('/api', router);


//server sent events 
app.get("/sse/:id", async (req, res) => {
    const match_id = req.params.id;
    await Match.increment('connected',{ where: { id: match_id}})
    res.set("Content-Type", "text/event-stream")
    res.set("Connection", "keep-alive")
    res.set("Cache-Control", "no-cache")
    res.set("Access-Control-Allow-Origin", "*")

    setInterval(async function(){
        try {
            let players;
            let connected;
            let state;
            let numbers;
            let actual_move;
            await Match.findByPk(match_id).then(match => {
                players = match.players;
                connected = match.connected;
                state = match.state;
                numbers = match.numbers;
                actual_move = match.actual_move;
            })
            

            if(connected == players && state == 'started'){
                //INIZIA L'ESTRAZIONE DEI NUMERI
                let number = numbers[actual_move].toString()
                res.write(number + '\n');

                await Match.increment('actual_move',{ where: { id: match_id}})


            } else if (state == 'closed'){
                res.write('event: close\ndata:\n\n');
                res.end();
            }



        } catch (error) {
            console.log(error);
        }

    }, 10000)
  })


app.get('/', (req, res) => {
    res.send({ message: 'hello'})
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('server is runnng on port: ' + PORT);
})