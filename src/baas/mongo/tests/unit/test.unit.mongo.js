/**
 * Created by prashun on 12/7/16.
 */
// index.js
var path = require('path');
global.appRoot = process.cwd();
const helper = require(global.appRoot + '/src/baas/mongo/mongo.helper');
const expect = require('chai').expect;

describe('1. tests for Mongo api ', () => {

    it('1.1 should get collections from mongo ', (done) => {
        helper.get_collections().then((collections) => {
            expect(collections.length).to.not.equals(0);
        });
        done()
    });

    it('1.2 should return the documents if the collection extists',(done) => {
        helper.show('user').then((collections) => {
            expect(collections.length).to.not.equals(0);
        });
        done();
    });

    it('1.3 should throw error if collection does not exist',(done) => {
        helper.show('users').then((collections) => {
            expect(collections.toString()).to.equals("Error: model does not exist" );
        });
        done();
    });

    it('1.4 should return the documents if the collection extists',(done) => {
        helper.getById('user','58031b53ce85efc3fd5dd821').then((collections) => {
            expect(collections.length).to.not.equals(0);
        });
        done();
    });

    it('1.5 should throw error if the document does not exist',(done) => {
        helper.getById('user','58031b53ce85efc3fd5dd8').then((collections) => {
            expect(collections).not.to.be.defined;
        });
        done();
    });

});