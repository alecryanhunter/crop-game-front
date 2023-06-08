export const APP_PRODUCTION = true;
export const GAME_PORT = process.env.PORT || 8000;
export const GAME_SERVER = APP_PRODUCTION ? `https://cropposition.herokuapp.com:${GAME_PORT}`: `http://localhost:${GAME_PORT}`;
export const BACKEND_URL = APP_PRODUCTION ? "https://cropposition-back.herokuapp.com" : "http://localhost:5678"
