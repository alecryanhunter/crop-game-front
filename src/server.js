const { Server, Origins } = require('boardgame.io/server')
const { CropGame } = require('./pages/Test')

const server = Server({
    games: [CropGame],
    origins: [Origins.LOCALHOST],
});

server.run(8000);