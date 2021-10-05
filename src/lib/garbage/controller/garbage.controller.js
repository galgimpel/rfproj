const { isEmpty } = require("lodash");
const garbageService = require("../../../services/garbage.service");
const collectionDateService = require("../../../services/collection-date.service");

const get = async (req, res) => {
    try {
        let response;
        if (isEmpty(req.query))
            response = await garbageService.get();
        else
            response = await garbageService.findBy(req.query);

        res.json(response);
    } catch (error) {
        next(error)
    }
};

const findOne = async (req, res) => {
    try {
        const garbage = await garbageService.findOne(req.params.id);
        res.json(garbage);
    } catch (error) {
        next(error)
    }
};

const create = async (req, res, next) => {
    try {
        const { color, type, location, collectedDate } = req.body;
        const createdGarbage = await garbageService.create({
            color,
            type,
            location,
            collectedDate,
            createdDate: new Date(),
            updatedDate: new Date(),
        });
        res.json(createdGarbage);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res) => {
    try {
        const { color, type, location, collectedDate } = req.body;
        const updatedGarbage = await garbageService.update(req.params.id, {
            color,
            type,
            location,
            collectedDate,
            updatedDate: new Date(),
        });
        res.json(updatedGarbage);
    } catch (error) {
        next(error)
    }
};

const updateLocation = async (req, res) => {
    try {
        const { location } = req.body;
        const updatedGarbage = await garbageService.update(req.params.id, {
            location,
            updatedDate: new Date(),
        });
        res.json(updatedGarbage);
    } catch (error) {
        next(error)
    }
};

const updateCollectedDate = async (req, res) => {
    try {
        const { collectedDate } = req.body;
        const updatedGarbage = await garbageService.update(req.params.id, {
            collectedDate,
            updatedDate: new Date(),
        });
        res.json(updatedGarbage);
    } catch (error) {
        next(error)
    }
};

const remove = async (req, res) => {
    try {
        const updatedGarbage = await garbageService.remove(req.params.id);
        res.json(updatedGarbage);
    } catch (error) {
        next(error)
    }
};

const collect = async (req, res, next) => {
    try {
        const garbageId = req.params.id;
        const names = ["Bob", "John", "Mark", "Sean"]; // mock data
        await collectionDateService.create({
            garbageId,
            at: new Date(),
            by: names[Math.floor(Math.random() * names.length)],
        });

        const collections = await collectionDateService.get(garbageId);
        const garbage = await garbageService.findOne(garbageId);
        garbage.collections = collections;

        res.json(garbage);
    } catch (error) {
        next(error)
    }
};

const getCollections = async (req, res) => {
    try {
        const garbageId = req.params.id;
        const collections = await collectionDateService.get(garbageId);
        res.json(collections);
    } catch (error) {
        next(error)
    }
};

const getLatestCollect = async (req, res) => {
    try {
        const garbageId = req.params.id;
        const latestCollect = await collectionDateService.getLatest(garbageId);
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