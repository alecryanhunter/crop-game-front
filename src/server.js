const { Server, Origins } = require("boardgame.io/server")
const fs = require('fs');
const path = require("path");
const serve = require("koa-static");
const { CropGame } = require('./components/Game')
const { GAME_PORT, APP_PRODUCTION } = require("./config")


const server = Server({
    games: [CropGame],
    origins: APP_PRODUCTION ? ["https://cropposition.herokuapp.com/"] : [Origins.LOCALHOST],
    // https: {
    //     cert: fs.readFileSync('/path/to/cert'),
    //     key: fs.readFileSync('/path/to/key'),
    //   },
});



// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, './build');
server.app.use(serve(frontEndAppBuildPath))

server.run(GAME_PORT, () => {
  server.app.use(
    async (ctx, next) => await serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: 'index.html' }),
      next
    )
  )
});