const { get } = require("lodash");

const prepareData = (collection) => {
    return get(collection, 'hits.hits', []).map((value) =>
        Object.assign(value._source, { id: value._id })
    );
};

const clearId = (object) => {
    delete object.id;
    return object;
};

module.exports = {
    prepareData,
    clearId,
};
