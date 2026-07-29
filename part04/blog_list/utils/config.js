process.loadEnvFile();
const PORT = process.env.PORT;
const MONGODB_URI = process.NODE_ENV !== 'test' ? process.env.MONGODB_URI : process.env.TEST_MONGODB_URI;
const SECRET = process.env.SECRET;
module.exports = { PORT, MONGODB_URI, SECRET };