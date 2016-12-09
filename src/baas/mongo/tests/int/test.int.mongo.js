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

describe('1. it should be able to handle mongo ', () => {

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
});