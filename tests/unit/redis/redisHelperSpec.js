// index.js
var path = require('path');
global.appRoot = process.cwd();
const helper = require(global.appRoot + '/src/baas/redis/redis.helper');
const expect = require('chai').expect;


describe('1. it should be able to handle redis ', () => {

    it('1.1 should set value to redis ', (done) => {
        helper.setKeyValue('key',JSON.stringify({val:'value'})).then((obj) =>{
            expect(obj).to.equals( JSON.stringify({val:'value'}));
        });
        done()
    });

    it('1.2 should get value in redis', function(done) {
        helper.get('key').then((value) => {
            expect(value).to.equals('"{\\"val\\":\\"value\\"}"');
        });
        done()
    });

    it('1.3 should set multiple values in redis cache  ', function(done) {
        helper.setMulti(["key", "test keys 1", "test val 1", "test keys 2", "test val 2"]).then((value) => {
            expect(value).to.equals(true);
        });
        done()
    });

    it('1.4 should get multiple values from redis ', function(done) {
        helper.getMulti(["key","test keys 1"]).then((val)=> {
            expect(val["key"]).to.equals(JSON.stringify({val:'value'}));
        });
        done()
    });

    it('1.5 should delete multiple values from redis ', function(done) {
        helper.del("key").then((val)=> {
            expect(val).to.equals("key");
        });
        done()
    });

    it('1.6 should clear redis', function(done) {
        helper.clear().then((val)=> {
            expect(val).to.equals(true);
        });
        done()
    });

});