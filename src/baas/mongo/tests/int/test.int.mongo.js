/**
 * Created by prashun on 12/8/16.
 */
var path = require('path');
global.appRoot = process.cwd();
const controller = require(global.appRoot + '/src/baas/mongo/mongo.controller');
const expect = require('chai').expect;
const express = require('express');
const app = express();
const request = require('supertest');
var agent = request.agent(app);

describe(' 1. tests for Mongo api ', () => {

    it('1.1 should get collections from mongo ', (done) => {

        app.get("/api/v1/mongo/collections", function(req, res){
          controller.get_collections(req, res);
        });

        agent
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

        app.get("/api/v1/mongo/:modelname", function(req, res){
            req.log={"debug":function(){},"error":function(){},"info":function(){}}
            controller.show(req, res);
        });

        agent
            .get('/api/v1/mongo/user')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(200);
                expect(res.body.response.docs.length).to.not.equal(0);
                expect(res.body.response.message).to.equal('found data for collection user');
                done()
            });
    });

    it('1.3 should throw error if collection does not exist ', (done) => {

        app.get("/api/v1/mongo/:modelname", function(req, res){
            req.log={"debug":function(){},"error":function(){},"info":function(){}}
            controller.show(req, res);
        });

        agent
            .get('/api/v1/mongo/users')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(404);
                done()
            });
    });

    it('1.4 should get documents for the given collection using id ', (done) => {

        app.get("/api/v1/mongo/:modelname/:id", function(req, res){
            req.log={"debug":function(){},"error":function(){},"info":function(){}}
            controller.get_by_id(req, res);
        });

        agent
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

        app.get("/api/v1/mongo/:modelname/:id", function(req, res){
            req.log={"debug":function(){},"error":function(){},"info":function(){}}
            controller.get_by_id(req, res);
        });

        agent
            .get('/api/v1/mongo/user/58031b53ce85efc3fd5dd21')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(404);
                done()
            });
    });

    it('1.6 should get documents for the given collection using id ', (done) => {

        app.get("/api/v1/mongo/:modelname/:field/:value", function(req, res){
            req.log={"debug":function(){},"error":function(){},"info":function(){}}
            controller.find(req, res);
        });

        agent
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

        app.get("/api/v1/mongo/:modelname/:field/:value", function(req, res){
            req.log={"debug":function(){},"error":function(){},"info":function(){}}
            controller.find(req, res);
        });

        agent
            .get('/api/v1/mongo/user/abc/xyz')
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(404);
                done()
            });
    });

    it('1.8 should save the documents for the given collection', function (done) {

        let user_stub = {
                "username": "lista1",
                "hashedPassword": "sJX8i7+EIsZUSHaIDYqprI1qz2lLmm9gXj6Rm1vY5RAE5LxMpc8dhHAFt2DjZD2Z0DCDwjqTY3di224uLVgYtw==",
                "salt": "WwGMU72wfXmxrc6yCa9YFw==",
                "roles": "57aec663adeceec90f543e19",
                "email": "lista1@cut.com1"
        }

        app.post("/api/v1/mongo/:modelname", function(req, res){
            req.log={"debug":function(){},"error":function(){},"info":function(){}}
            controller.insert(req, res);
        });

        agent
            .post('/api/v1/mongo/user')
            .send(user_stub)
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(200);
                expect(res.body.response.docs.length).to.not.equal(0);
                expect(res.body.response.message).to.equal('found data in collection user by field username with value lisa2');
                done()
            });

        done();
    });

    it('1.9 should throw an error when the documents for the given collection fail to be inserted', function (done) {

        let user_stub = {
            "username": "lista1",
            "hashedPassword": "sJX8i7+EIsZUSHaIDYqprI1qz2lLmm9gXj6Rm1vY5RAE5LxMpc8dhHAFt2DjZD2Z0DCDwjqTY3di224uLVgYtw==",
            "salt": "WwGMU72wfXmxrc6yCa9YFw==",
            "roles": "57aec663adeceec90f543e19"
        }
        app.post("/api/v1/mongo/:modelname", function(req, res){
            req.log={"debug":function(){},"error":function(){},"info":function(){}}
            controller.insert(req, res);
        });

        agent
            .post('/api/v1/mongo/xyz')
            .send(user_stub)
            .end( (err, res) =>  {
                if (err) return done(err)
                expect(res.status).to.equal(404);
                done()
            });

        done();
    });


});