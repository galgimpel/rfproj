
const { logger } = require("../../core/logger");
const utility = require('../../utilities/utility');
const es = require("elasticsearch");
const client = es.Client({ host: "http://localhost:9200" });

const DISTANCE = "150km";

const expr = async (action, { index, id, body }) => {
    try {
        return await client[action]({ index, id, body });
    } catch (error) {
        logger.error(error);
    }
}

class elasticsearchProvider {
    async create(payload, { index }) {
        return expr("index", { index, body: payload });
    }
    async retrieveAll({ index, query }, options = {}) {
        const body = {};
        if (query)
            body.query = buildQuery(querystring);

        if (options.size)
            body.size = options.size;

        if (options.sort)
            body.sort = options.sort;

        const result = await expr("search", { index, body });
        return utility.prepareData(result);
    }
    async retrieve(id, { index }) {
        console.log('---retrieve',id);
        return expr("get", { index, id });
    }
    async update(id, payload, { index }) {
        return expr("index", { index, id, body: utility.clearId(payload) });
    }
    async del(id, { index }) {
        return expr("delete", { index, id });
    }
}

function buildQuery(querystring) {
    let query = { range: {} };
    if (querystring.collectedDate)
        query.range = createRangeFilter('collectedDate', querystring);
    else if (querystring.lat && querystring.lon)
        query = createGeoDistanceFilter(querystring);

    return query;
}

function createGeoDistanceFilter(querystring) {
    return {
        bool: {
            must: { match_all: {} },
            filter: {
                geo_distance: {
                    distance: DISTANCE,
                    location: {
                        lat: querystring.lat,
                        lon: querystring.lon,
                    },
                },
            },
        },
    };
}

function createRangeFilter(key, querystring) {
    return {
        [key]: {
            gte: moment(querystring[key]).startOf("day"),
            lte: moment(querystring[key]).endOf("day"),
        }
    };
}

module.exports = elasticsearchProvider;