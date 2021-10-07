const winston = require("winston");
const { printf } = winston.format;

const errorStackFormat = winston.format(info => {
    if (info instanceof Error) {
        return Object.assign({}, info, {
            stack: info.stack,
            statusCode: info.statusCode,
            message: info.message,
            path: info.path
        })
    }
    return info;
})

const foramt = printf(info => {
    return ` ${new Date().toJSON()} [${info.level}]: { message: ${info.message}, body: ${JSON.stringify(info.body)}, response: ${info.response}, }`;

    //stack:${info.stack}
});

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: 'warn' }),
        new winston.transports.File({ level: 'error', filename: 'logs/errors.log' })
    ],
    format: winston.format.combine(errorStackFormat(), foramt)
});

const formatf = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = ` ${new Date().toJSON()} [${level}] : ${message} `;
    if (metadata) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});


const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(formatf),
    meta: false,
    ignoreRoute: (req, res) => false,
}

module.exports = { logger, loggerOptions };
