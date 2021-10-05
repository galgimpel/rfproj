const { logger } = require("../core/logger");
const es = require("elasticsearch");
const client = es.Client({ host: "http://localhost:9200" });

const expr = async (action, { index, id, body }) => {
    try {
        return await client[action]({ index, id, body });
    } catch (error) {
        logger.error(error);
    }
}

const get = async ({ index, id }) => await expr("get", { index, id });
const search = async ({ index, id, body }) => await expr("search", { index, id, body });
const index = async ({ index, id, body }) => await expr("index", { index, id, body });
const remove = async ({ index, id }) => await expr("delete", { index, id });

const service = {
    get,
    search,
    index,
    remove
}

module.exports = service;