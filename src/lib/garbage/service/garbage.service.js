const garbageRepository = require("../../../repositories/garbage.repository");
const collectionDateRepository = require("../../../repositories/collection-date.repository");
const { MissingMandatoryParameterError400 } = require('../../../core/errors');
const { isEmpty } = require("lodash");

const get = async (query) => {
console.log(query);

    if (isEmpty(query))
        return garbageRepository.find();

    return garbageRepository.find(query);
};

const findOne = async (id) => {
    return garbageRepository.findOne(id);
};

const create = async (payload) => {
    const { color, type, location, collectedDate } = payload;
    return garbageRepository.create({
        color,
        type,
        location,
        collectedDate,
        createdDate: new Date(),
        updatedDate: new Date(),
    });
};
const update = async (id, payload) => {
    payload.updatedDate = new Date();
    return garbageRepository.update(id, payload);
};
const updateLocation = async () => { };
const updateCollectedDate = async () => { };
const remove = async (id) => {
    return garbageRepository.remove(id);
};
const collect = async (garbageId) => {
    const names = ["Bob", "John", "Mark", "Sean"];
    await collectionDateRepository.create({
        garbageId,
        at: new Date(),
        by: names[Math.floor(Math.random() * names.length)],
    });

    const query = { match: { garbageId } };
    const collections = await collectionDateRepository.find(query);
    const garbage = await garbageRepository.findOne(garbageId);
    garbage.collections = collections;

    res.json(garbage);
};
const getCollections = async (garbageId) => {
    if (!garbageId)
        throw new errors.MissingMandatoryParameterError400('garbageId');

    const query = { match: { garbageId } };
    const collections = await collectionDateRepository.find(query);

    return utility.prepareData(collections);
};

const getLatestCollect = async (garbageId) => {
    if (!garbageId)
        throw new MissingMandatoryParameterError400('garbageId');

    let latestCollect = await redis.get(garbageId);
    if (latestCollect) return latestCollect;

    const query = { match: { garbageId } };
    const options = { size: 1, sort: { at: "desc" } };
    latestCollect = await collectionDateRepository.find(query, options);

    if (latestCollect) redis.set(garbageId, latestCollect);

    return utility.prepareData(latestCollect);
};

module.exports = {
    get,
    findOne,
    create,
    update,
    updateLocation,
    updateCollectedDate,
    remove,
    collect,
    getCollections,
    getLatestCollect,
}
