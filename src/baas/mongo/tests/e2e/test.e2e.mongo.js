/**
 * Created by prashun on 12/7/16.
 */
/**
 * Created by prashun on 12/8/16.
 */
var path = require('path');
global.appRoot = process.cwd();
const expect = require('chai').expect;
const request = require('supertest');
var b_agent = request.agent("http://localhost:9000");

describe('1. it should be able to handle mongo ', () => {

    it('1.1 should get collections from mongo ', (done) => {

        b_agent
            .get('/api/v1/mongo/collections')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(200);
                expect(res.body.response.docs.length).to.not.equal(0);
                expect(res.body.response.message).to.equal('sucessfully got collections');
                done()
            });
    });
});