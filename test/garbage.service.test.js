const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const elasticsearch = require('../src/core/elasticsearch');
const server = require('../index');
const sinoncChai = require('sinon-chai');
const garbageService = require('../src/services/garbage.service');
const { MissingMandatoryParameterError400, ObjectNotFoundError409 } = require('../src/core/errors');

chai.use(sinoncChai);

describe('Garbage service test', () => {

    let elasticsearchGetStub, elasticsearchSearchStub;

    beforeEach(function () {
        elasticsearchGetStub = sinon.stub(elasticsearch, "get");
        elasticsearchSearchStub = sinon.stub(elasticsearch, "search");
    });

    afterEach(function () {
        elasticsearchGetStub.restore();
        elasticsearchSearchStub.restore();
    });

    describe("findOne()", async () => {

        it("should return garbage object", async () => {
            const garbages = {
                _source: {
                    "id": "1",
                    "color": "red",
                    "type": "1",
                    "location": {
                        "lat": 32,
                        "lon": 34
                    }
                }
            };

            elasticsearchGetStub.returns(Promise.resolve(garbages));
            const result = await garbageService.findOne('1');
            expect(result).to.be.an('object');
            expect(result).to.deep.include({ id: '1', color: 'red', type: '1', location: { lat: 32, lon: 34 } });
        });

        it("should return an error of MissingMandatoryParameterError400", async () => {
            try {
                const func = async () => await garbageService.findOne(undefined);
                expect(func).to.throw(MissingMandatoryParameterError400).with.property('status', 400);
            } catch (error) { }
        });

        it("should return an error of ObjectNotFoundError409", async () => {
            elasticsearchGetStub.returns(Promise.resolve({ _source: {} }));

            try {
                const func = async () => await garbageService.findOne('1');
                expect(func).to.throw(ObjectNotFoundError409).with.property('status', 409);
            } catch (error) { }
        });

    });

    describe("get()", async () => {

        it("should return garbages array", async () => {
            const garbages = {
                hits: {
                    hits: [{
                        _source: {
                            "id": "1",
                            "color": "red",
                            "type": "1",
                            "location": {
                                "lat": 32,
                                "lon": 34
                            }
                        }
                    }, {
                        _source: {
                            "id": "2",
                            "color": "green",
                            "type": "2",
                            "location": {
                                "lat": 62,
                                "lon": 74
                            }
                        }
                    }]
                }
            };

            elasticsearchSearchStub.returns(Promise.resolve(garbages));
            const result = await garbageService.get();
            expect(result).to.be.an('array');
            expect(result).to.have.lengthOf(2);
        });


        it("should return an error of ObjectNotFoundError409", async () => {
            const garbages = {};
            elasticsearchSearchStub.returns(Promise.resolve(garbages));
            try {
                const func = async () => await garbageService.get()
                expect(func).to.throw(ObjectNotFoundError409).with.property('status', 409);
            } catch (error) { }
        });


    });

    describe("findBy()", async () => {

        it("should return garbages array by collectedDate query", async () => {
            
        });
    });


});