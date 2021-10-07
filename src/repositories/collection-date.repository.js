const { merge } = require("lodash");
const dbAgent = require('../db/agent');
const dbProvider = dbAgent.configure({ providerName: 'elasticsearch' });
const { MissingMandatoryParameterError400, ObjectNotFoundError409 } = require('../core/errors');

const INDEX = "collection-date";

const findOne = async (id) => {
    if (!id)
        throw new MissingMandatoryParameterError400('id');

    const result = dbProvider.retrieve(id, { index: INDEX });
    if (!result)
        throw new ObjectNotFoundError409(id, INDEX);

    return Object.assign(result._source, { id });
};

const find = async (query, options) => {
    return dbProvider.retrieveAll({ index: INDEX, query }, options);
};

const create = async (payload) => {
    return dbProvider.create(payload, { index: INDEX });
};

const update = async (id, payload) => {
    if (!id)
        throw new MissingMandatoryParameterError400('id');

    const result = await findOne(id);
    if (!result)
        throw new ObjectNotFoundError409(INDEX);

    merge(result, payload);
    return dbProvider.update(id, result, { index });
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