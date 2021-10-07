const Redis = require('ioredis');
const { promisify } = require('util');

const redisConfig = {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_PORT || '127.0.0.1'
}

const client = new Redis(redisConfig);
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

module.exports = {
    get: async (key) => {
        const reply = await GET_ASYNC(key);
        if (reply) {
            console.log(` ${new Date().toJSON()} [cache] GET -> { key: ${key} }`);
            return JSON.parse(reply);
        }
    },
    set: async (key, value) => {
        const result = await SET_ASYNC(key, JSON.stringify(value), 'EX', 300);
        console.log(` ${new Date().toJSON()} [cache] SET -> { key: ${key} }`);
        return result;
    }
}