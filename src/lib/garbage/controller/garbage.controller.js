const garbageService = require("../service/garbage.service");

const get = async (req, res, next) => {
    try {
        console.log(req.query);
        const response = await garbageService.get(req.qeury);
        res.json(response);
    } catch (error) {
        next(error);
    }
};

const findOne = async (req, res, next) => {
    try {
        const garbage = await garbageService.findOne(req.params.id);
        res.json(garbage);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const createdGarbage = await garbageService.create(req.body);
        res.json(createdGarbage);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { color, type, location, collectedDate } = body;
        const updatedGarbage = await garbageService.update(req.params.id, { color, type, location, collectedDate });
        res.json(updatedGarbage);
    } catch (error) {
        next(error);
    }
};

const updateLocation = async (req, res, next) => {
    try {
        const { location } = req.body;
        const updatedGarbage = await garbageService.update(req.params.id, { location, updatedDate: new Date() });
        res.json(updatedGarbage);
    } catch (error) {
        next(error);
    }
};

const updateCollectedDate = async (req, res, next) => {
    try {
        const { collectedDate } = req.body;
        const updatedGarbage = await garbageService.update(req.params.id, { collectedDate });
        res.json(updatedGarbage);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res) => {
    try {
        const updatedGarbage = await garbageService.remove(req.params.id);
        res.json(updatedGarbage);
    } catch (error) {
        next(error);
    }
};

const collect = async (req, res, next) => {
    try {
        const garbage = await garbageService.collect(req.params.id);
        res.json(garbage);
    } catch (error) {
        next(error)
    }
};

const getCollections = async (req, res) => {
    try {
        const collections = await garbageService.getCollections(req.params.id);
        res.json(collections);
    } catch (error) {
        next(error)
    }
};

const getLatestCollect = async (req, res) => {
    try {
        const latestCollect = await garbageService.getLatestCollect(req.params.id);
        res.json(latestCollect);
    } catch (error) {
        next(error)
    }
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