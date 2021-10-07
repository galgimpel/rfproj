
// const chai = require('chai');
// const expect = chai.expect;
// const chaiHttp = require('chai-http');
// const server = require('../index');
// const request = require('request');

// chai.should();
// chai.use(chaiHttp);

// let requestMock = sinon.mock(request);

// describe('Garbage controller test', () => {


//     /**
//      * Test GET route
//      */
//     describe("GET /garbage", () => {

//         requestMock.expects("get")
//             .once()
//             .withArgs('https://localhost:3000/garbage')
//             .yields(null, null, JSON.stringify([{
//                 "color": "green",
//                 "type": "1",
//                 "location": {
//                     "lat": 32,
//                     "lon": 34
//                 }
//             },
//             {
//                 "color": "red",
//                 "type": "2",
//                 "location": {
//                     "lat": 54,
//                     "lon": 58
//                 }
//             }]));

//         it("It should GET all garbages", (done) => {
//             chai.request(server)
//                 .get("/garbage")
//                 .end((err, res) => {
//                     expect(res.status).to.equal(200);
//                     expect(res.body).to.be.an('array');
//                     expect(res.body.length).to.equal(7);
//                     done();
//                 });
//         });

//     });

//     //should return a 401 status for an invalid email
//     it('should return a 201 status for created a new garbage can', async () => {

//     });

// });