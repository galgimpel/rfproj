const es1 = require("elasticsearch");
const client = require("../core/elasticsearch");
const moment = require("moment");
const { merge } = require("lodash");
const validators = require("../utilities/validators");
const utility = require("../utilities/utility");
const { MissingFieldError409, MissingMandatoryParameterError400, ObjectNotFoundError409 } = require('../core/errors');

//const client = es.Client({ host: "http://localhost:9200" });

const INDEX = "garbage";
const DISTANCE = "150km";

const findOne = async (id) => {
    if (!id)
        throw new MissingMandatoryParameterError400('id');

    const garbage = await client.get({ index: INDEX, id });
    if (!garbage)
        throw new MissingFieldError409(id, 'garbage');

    return Object.assign(garbage._source, { id });
};

const get = async () => {
    const garbages = await client.search({ index: INDEX });
    if (!garbages)
        throw new ObjectNotFoundError409('garbages');

    return utility.prepareData(garbages);
};

const findBy = async (querystring) => {
    let query = { range: {} };
    if (querystring.collectedDate) {
        query.range = {
            collectedDate: {
                gte: moment(querystring.collectedDate).startOf("day"),
                lte: moment(querystring.collectedDate).endOf("day"),
            },
        };
    } else if (querystring.lat && querystring.lon) {
        query = {
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

    const garbages = await client.search({ index: INDEX, body: { query } });
    if (!garbages)
        throw new ObjectNotFoundError409('garbages');

    return utility.prepareData(garbages);
};

const create = async (payload) => {
    validators.includePropValidation(payload, [
        "color",
        "type",
        "location",
        "collectedDate",
    ]);
    const createdGarbage = await client.index({ index: INDEX, body: payload });
    return findOne(createdGarbage._id);
};

const update = async (id, payload) => {
    if (!id)
        throw new MissingMandatoryParameterError400('id');

    const garbage = await findOne(id);
    merge(garbage, payload);
    const updatedGarbage = await client.index({
        index: INDEX,
        id,
        body: utility.clearId(garbage),
    });

    return findOne(updatedGarbage._id);
};

const remove = async (id) => {
    if (!id)
        throw new MissingMandatoryParameterError400('id');

    return client.delete({ index: INDEX, id });
};

module.exports = {
    get,
    findOne,
    findBy,
    create,
    update,
    remove,
};
