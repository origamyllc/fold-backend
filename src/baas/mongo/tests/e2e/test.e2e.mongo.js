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

    it('1.2 should get documents for the given collection ', (done) => {

        b_agent
            .get('/api/v1/mongo/user')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(200);
                expect(res.body.response.docs.length).to.not.equal(0);
                expect(res.body.response.message).to.equal('found data for collection user');
                done()
            });
    });

    it('1.3 should get documents for the given collection ', (done) => {

        b_agent
            .get('/api/v1/mongo/users')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(404);
                done()
            });
    });

    it('1.4 should get documents for the given collection using id ', (done) => {

        b_agent
            .get('/api/v1/mongo/user/58031b53ce85efc3fd5dd821')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(200);
                expect(res.body.response.docs.length).to.not.equal(0);
                expect(res.body.response.message).to.equal('found  data for collection user for id 58031b53ce85efc3fd5dd821');
                done()
            });
    });

    it('1.5 should throw error when getting documents for the given collection using id ', (done) => {

        b_agent
            .get('/api/v1/mongo/user/8031b53ce85efc3fd5dd21')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(404);
                done()
            });
    });

    it('1.6 should get documents for the given collection using id ', (done) => {

        b_agent
            .get('/api/v1/mongo/user/username/lisa2')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(200);
                expect(res.body.response.docs.length).to.not.equal(0);
                expect(res.body.response.message).to.equal('found data in collection user by field username with value lisa2');
                done()
            });
    });

    it('1.7 should get documents for the given collection using id ', (done) => {

        b_agent
            .get('/api/v1/mongo/user/abc/xyz')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(404);
                done()
            });
    });

    it('1.8 should save the documents for the given collection', function (done) {

        let user_stub = {
            "username": "lista81",
            "hashedPassword": "sJX8i7+EIsZUSHaIDYqprI1qz2lLmm9gXj6Rm1vY5RAE5LxMpc8dhHAFt2DjZD2Z0DCDwjqTY3di224uLVgYtw==",
            "salt": "WwGMU72wfXmxrc6yCa9YFw==",
            "roles": "57aec663adeceec90f543e19",
            "email": "lista91@cut.com1"
        }

        b_agent
            .post('/api/v1/mongo/user')
            .send(user_stub)
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(200);
                expect(res.body.response.docs.length).to.not.equal(0);
            });
        done();
    });

    it('1.9 should throw error if can not insert  documents for the given collection', function (done) {

        let user_stub = {
            "username": "lista1",
            "hashedPassword": "sJX8i7+EIsZUSHaIDYqprI1qz2lLmm9gXj6Rm1vY5RAE5LxMpc8dhHAFt2DjZD2Z0DCDwjqTY3di224uLVgYtw==",
            "salt": "WwGMU72wfXmxrc6yCa9YFw==",
            "roles": "57aec663adeceec90f543e19",
            "email": "lista1@cut.com1"
        }

        b_agent
            .post('/api/v1/mongo/user')
            .send(user_stub)
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(500);
            });
        done();
    });

    it('1.10 should update the documents for the given collection by id', function (done) {
        let user_stub = {
            "username": "lista1"
        }

        b_agent
            .post('/api/v1/mongo/user/58031b53ce85efc3fd5dd821')
            .send(user_stub)
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(200);
            });

        done();
    });

    it('1.11 should throw an error when the documents for the given collection fail to be updated', function (done) {

        let user_stub = {
            "username": "lista1"
        }

        b_agent
            .post('/api/v1/mongo/xyz/58031b53ce85efc3fd5dd821')
            .send(user_stub)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.equal(404);
            });

        done();
    });

    it('1.12 should update the documents for the given collection by field', function (done) {

        let user_stub = {
            "username": "testing_stuff"
        }

        b_agent
            .put('/api/v1/mongo/user/username/lisa2')
            .send(user_stub)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.equal(200);
            });

        done();
    });

    it('1.13 should throw an error when the documents for the given collection fail to be updated', function (done) {
        let user_stub = {
            "username": "lista1"
        }

        b_agent
            .put('/api/v1/mongo/xyz/userame/lisa')
            .send(user_stub)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.status).to.equal(404);
            });

        done();
    });

});