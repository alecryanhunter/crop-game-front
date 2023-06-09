export const APP_PRODUCTION = false;
export const GAME_PORT = process.env.PORT || 8000;
export const GAME_SERVER = APP_PRODUCTION ? `https://cropposition.herokuapp.com`: `http://localhost:${GAME_PORT}`;
export const BACKEND_URL = APP_PRODUCTION ? "https://cropposition-back.herokuapp.com" : "http://localhost:5678"
