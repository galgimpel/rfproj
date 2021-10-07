const client = require("../core/elasticsearch");
const { merge } = require("lodash");
const dbAgent = require('../db/agent');
const dbProvider = dbAgent.configure({ providerName: 'elasticsearch' });
const { MissingFieldError409, MissingMandatoryParameterError400, ObjectNotFoundError409 } = require('../core/errors');

const INDEX = "garbage";

const findOne = async (id) => {
    if (!id)
        throw new MissingMandatoryParameterError400('id');

    const garbage = await dbProvider.retrieve(id, { index: INDEX });
    if (!garbage)
        throw new ObjectNotFoundError409(id, 'garbage');

    return Object.assign(garbage._source, { id });
};

const find = async (query) => {
    return dbProvider.retrieveAll({ index: INDEX, query });
};

const create = async (payload) => {
    return dbProvider.create(payload, { index: INDEX });
};

const update = async (id, payload) => {
    if (!id)
        throw new MissingMandatoryParameterError400('id');

    const garbage = await findOne(id);
    if (!garbage)
        throw new ObjectNotFoundError409('garbage');

    merge(garbage, payload);
    return dbProvider.update(id, garbage, { index });
};

const remove = async (id) => {
    if (!id)
        throw new MissingMandatoryParameterError400('id');

    return dbProvider.del(id, { index: INDEX });
};

module.exports = {
    find,
    findOne,
    create,
    update,
    remove,
};
