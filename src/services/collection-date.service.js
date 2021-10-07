// const client = require("../core/elasticsearch");
// const validators = require("../utilities/validators");
// const utility = require("../utilities/utility");
// const redis = require("../core/redis");
// const errors = require("../core/errors");

// //const client = es.Client({ host: "http://localhost:9200" });

// const INDEX = "collection-date";

// const findOne = async (id) => {
//     if (!id)
//         throw new errors.MissingMandatoryParameterError400();

//     const collection = await client.get({ index: INDEX, id });
//     return Object.assign(collection._source, { id });
// };

// const create = async (payload) => {
//     validators.includePropValidation(payload, ["garbageId", "at"]);
//     const createdCollection = await client.index({ index: INDEX, body: payload });
//     redis.set(payload.garbageId, createdCollection);

//     return findOne(createdCollection._id);
// };

// const getCollections = async (garbageId) => {

//     console.log('garbageId');
//     console.log(garbageId);

//     if (!garbageId)
//         throw new errors.MissingMandatoryParameterError400('garbageId');

//     const query = { match: { garbageId } };
//     const collections = await client.search({
//         index: INDEX,
//         body: { query },
//     });

//     return utility.prepareData(collections);
// };

// const getLatest = async (garbageId) => {
//     if (!garbageId)
//         throw new errors.MissingMandatoryParameterError400('garbageId');

//     let latestCollect = await redis.get(garbageId);
//     if (latestCollect) return latestCollect;

//     latestCollect = await client.search({
//         index: INDEX,
//         body: {
//             size: 1,
//             sort: { at: "desc" },
//             query: {
//                 match: {
//                     garbageId,
//                 },
//             },
//         },
//     });

//     if (latestCollect) redis.set(garbageId, latestCollect);

//     return utility.prepareData(latestCollect);
// };

// module.exports = {
//     create,
//     get,
//     getLatest,
// };
