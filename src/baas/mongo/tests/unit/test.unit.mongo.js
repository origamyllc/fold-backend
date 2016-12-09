/**
 * Created by prashun on 12/7/16.
 */
// index.js
var path = require('path');
global.appRoot = process.cwd();
const helper = require(global.appRoot + '/src/baas/mongo/mongo.helper');
const expect = require('chai').expect;

describe('1. it should be able to handle mongo ', () => {

    it('1.1 should get collections from mongo ', (done) => {
        helper.get_collections().then((collections) => {
            expect(collections.length).to.not.equals(0);
        });
        done()
    });
});